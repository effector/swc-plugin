use std::rc::Rc;

use swc_core::{
    common::{Span, util::take::Take},
    ecma::{
        ast::*,
        utils::ExprFactory,
        visit::{VisitMut, VisitMutWith, VisitWith, noop_visit_mut_type},
    },
    quote,
};
use tools::HmrToolMap;

use self::{finder::CallFinder, tools::HmrTool};
use crate::{
    config::{Config, HotReplacementMode},
    utils::{EffectorMatcher, UniqueId},
    visitors::VisitorMeta,
};

mod finder;
mod tools;

const REGION: &str = "region";

struct HotModuleReplacer {
    tools: HmrToolMap,

    matcher: EffectorMatcher,

    region: Option<Ident>,
    config: Rc<Config>,
}

pub(crate) fn hmr(meta: &VisitorMeta) -> impl VisitMut + use<> {
    HotModuleReplacer {
        tools: HmrToolMap::new(),

        matcher: EffectorMatcher::from_meta(meta),

        region: None,
        config: meta.config.clone(),
    }
}

impl HotModuleReplacer {
    fn create_import(&mut self) -> ModuleItem {
        let specifiers: Vec<_> = HmrTool::LIST
            .iter()
            .map(|tool| (self.tools.get(tool).clone(), tool.as_str()))
            .map(|(local, imported)| ImportNamedSpecifier {
                local: local.into(),
                imported: Some(Ident::from(imported).into()),
                span: Span::dummy(),
                is_type_only: false,
            })
            .map(ImportSpecifier::Named)
            .collect();

        let mut import = quote!("import {} from 'effector'" as ModuleItem);

        import
            .as_mut_module_decl()
            .and_then(|module| module.as_mut_import())
            .unwrap()
            .specifiers = specifiers;

        import
    }

    fn create_region(&mut self) -> ModuleItem {
        let id = self.region.clone().unwrap();

        let config = quote!("{ regional: true }" as Expr);

        self.tools
            .get(&HmrTool::CreateNode)
            .clone()
            .as_call(Span::dummy(), vec![config.into()])
            .into_var_decl(VarDeclKind::Const, id.into())
            .into()
    }

    fn create_dispose(&mut self) -> ModuleItem {
        let handler = quote!("() => $clear($region)" as Expr,
            clear: Ident = self.tools.get(&HmrTool::ClearNode).clone().into(),
            region: Ident = self.region.clone().unwrap()
        );

        match self.config.hmr.mode() {
            HotReplacementMode::Module => {
                quote!("if (module.hot) module.hot.dispose($handler)" as ModuleItem, handler: Expr = handler)
            }
            HotReplacementMode::ImportMeta => {
                quote!("if (import.meta.hot) import.meta.hot.dispose($handler)" as ModuleItem, handler: Expr = handler)
            }
            HotReplacementMode::Disabled => unreachable!("visitor should not have run"),
            HotReplacementMode::Detect => unreachable!("detection is not supported"),
        }
    }

    fn wrap(&mut self, original: Expr) -> CallExpr {
        let region = self.region.get_or_insert_with(|| UniqueId::ident(REGION));
        let with = self.tools.get(&HmrTool::WithRegion);

        quote!(
            "$with($region, () => $original)" as Expr,
            with: Ident = with.clone().into(),
            region: Ident = region.clone(),
            original: Expr = original
        )
        .expect_call()
    }
}

impl VisitMut for HotModuleReplacer {
    noop_visit_mut_type!();

    fn visit_mut_module(&mut self, node: &mut Module) {
        node.visit_mut_children_with(self);

        if self.region.is_none() {
            return;
        };

        let region = self.create_region();
        let import = self.create_import();
        let dispose = self.create_dispose();

        let first_import = node
            .body
            .iter()
            .position(|expr| matches!(expr, ModuleItem::ModuleDecl(..)))
            .unwrap_or(0);

        node.body.insert(first_import, region);
        node.body.insert(first_import, import);

        node.body.push(dispose);
    }

    fn visit_mut_arrow_expr(&mut self, _: &mut ArrowExpr) {}
    fn visit_mut_function(&mut self, _: &mut Function) {}
    fn visit_mut_class(&mut self, _: &mut Class) {}

    fn visit_mut_call_expr(&mut self, node: &mut CallExpr) {
        let mut finder = CallFinder::new(&self.matcher);

        node.visit_with(&mut finder);

        if finder.is_found() {
            *node = self.wrap(node.take().into());
        }
    }
}
