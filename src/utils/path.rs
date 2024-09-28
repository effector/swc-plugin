use std::path::{Component, Path, PathBuf};

use swc_core::plugin::metadata::{
    TransformPluginMetadataContextKind, TransformPluginProgramMetadata,
};

pub trait Resolve {
    fn resolve(&self) -> PathBuf;
}

impl Resolve for Path {
    // https://github.com/rust-lang/cargo/blob/fede83ccf973457de319ba6fa0e36ead454d2e20/src/cargo/util/paths.rs#L61
    fn resolve(&self) -> PathBuf {
        let mut components = self.components().peekable();

        let mut normalized =
            if let Some(c @ Component::Prefix(..)) = components.peek().cloned() {
                components.next();
                PathBuf::from(c.as_os_str())
            } else {
                PathBuf::new()
            };

        for component in components {
            match component {
                Component::Prefix(..) => unreachable!("no prefix should exist"),
                Component::RootDir => {
                    normalized.push(component.as_os_str());
                }
                Component::CurDir => {}
                Component::ParentDir => {
                    normalized.pop();
                }
                Component::Normal(c) => {
                    normalized.push(c);
                }
            }
        }

        normalized
    }
}

pub(crate) fn filename_from_meta(
    meta: &TransformPluginProgramMetadata,
) -> Option<String> {
    let file = meta
        .get_context(&TransformPluginMetadataContextKind::Filename)?
        .replace(r"\", r"/");

    let cwd = meta
        .get_context(&TransformPluginMetadataContextKind::Cwd)?
        .replace(r"\", r"/");

    let file = Path::new(&file)
        .strip_prefix(cwd)
        .map(|path| path.to_string_lossy().to_string())
        .unwrap_or(file);

    Some(file)
}
