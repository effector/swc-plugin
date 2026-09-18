use swc_core::{
    common::{BytePos, Loc, SourceMapper},
    plugin::errors::HANDLER,
};

pub(crate) trait SourceMapperExt {
    fn try_lookup_pos(&self, pos: BytePos) -> Option<Loc>;
}

impl<T: SourceMapper + ?Sized> SourceMapperExt for T {
    fn try_lookup_pos(&self, pos: BytePos) -> Option<Loc> {
        if pos.is_dummy() {
            HANDLER.with(|handler| {
                // https://github.com/effector/swc-plugin/issues/39
                handler
                    .struct_err(
                        "effector: cannot derive a Stable ID as this call has no source \
                         code position information",
                    )
                    .note(
                        "verify plugin usage and ordering, as an earlier transform may \
                         have erased source mapping data (commonly, React Compiler)",
                    )
                    .emit()
            });

            return None;
        }

        Some(self.lookup_char_pos(pos))
    }
}
