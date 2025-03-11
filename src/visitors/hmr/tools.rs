use swc_core::ecma::ast::Id;

use crate::utils::UniqueId;

#[derive(Debug, Eq, PartialEq, Copy, Clone, Hash)]
pub(super) enum HmrTool {
    WithRegion,
    ClearNode,
    CreateNode,
}

impl HmrTool {
    const SPECIFIERS: [&'static str; 3] = ["withRegion", "clearNode", "createNode"];

    pub const LIST: [HmrTool; 3] =
        [HmrTool::WithRegion, HmrTool::ClearNode, HmrTool::CreateNode];

    pub fn as_str(&self) -> &'static str {
        Self::SPECIFIERS[*self as usize]
    }
}

#[derive(Debug)]
pub(super) struct HmrToolMap {
    pub region: Id,
    pub clear:  Id,
    pub create: Id,
}

impl HmrToolMap {
    pub fn get(&self, tool: &HmrTool) -> &Id {
        match tool {
            HmrTool::WithRegion => &self.region,
            HmrTool::ClearNode => &self.clear,
            HmrTool::CreateNode => &self.create,
        }
    }

    pub fn new() -> Self {
        let ident = |tool: HmrTool| UniqueId::ident(tool.as_str()).to_id();

        Self {
            region: ident(HmrTool::WithRegion),
            clear:  ident(HmrTool::ClearNode),
            create: ident(HmrTool::CreateNode),
        }
    }
}
