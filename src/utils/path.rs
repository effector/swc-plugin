use std::path::{Component, Path, PathBuf};

pub trait Resolve {
    fn resolve(&self) -> PathBuf;
}

impl Resolve for Path {
    // https://github.com/rust-lang/cargo/blob/fede83ccf973457de319ba6fa0e36ead454d2e20/src/cargo/util/paths.rs#L61
    fn resolve(&self) -> PathBuf {
        let mut components = self.components().peekable();

        let mut normalized = if let Some(c @ Component::Prefix(..)) = components.peek().cloned() {
            components.next();
            PathBuf::from(c.as_os_str())
        } else {
            PathBuf::new()
        };

        for component in components {
            match component {
                Component::Prefix(..) => unreachable!(),
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
