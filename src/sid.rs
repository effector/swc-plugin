use ahash::RandomState;
use radix_fmt::radix_36;

const STATE: RandomState =
    RandomState::with_seeds(0xD3ADB33F, 0xF00DBABE, 0xCAF3BAB3, 0x8BADF00D);

pub(crate) struct StableIdentifer<'a> {
    pub name:   &'a str,
    pub file:   &'a str,
    pub line:   usize,
    pub column: usize,

    pub debug: bool,
}

impl StableIdentifer<'_> {
    pub(crate) fn to_sid(&self) -> String {
        let file = self.file;
        let name = self.name;

        let id = format!("{} {} [{}, {}]", name, file, self.line, self.column);
        let hash = STATE.hash_one(id) >> 24; // Shorten the hash

        if self.debug {
            format!("{hashed}:{file}:{name}", hashed = radix_36(hash))
        } else {
            radix_36(hash).to_string()
        }
    }
}
