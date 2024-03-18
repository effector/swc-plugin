import { createDomain } from "effector";
import { importedDomain } from "./local-file";
const created = createDomain("created", {
    sid: "7bhem3qi",
    name: "created",
    loc: {
        file: "input.js",
        line: 4,
        column: 16
    }
});
// --- event ---
const event = created.createEvent({
    sid: "9xvj0z8m",
    name: "event",
    loc: {
        file: "input.js",
        line: 6,
        column: 14
    }
});
const eventShort = created.event({
    sid: "1vbi0opj",
    name: "eventShort",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
const eventImported = importedDomain.event("name", {
    sid: "6yuv83yb",
    name: "eventImported",
    loc: {
        file: "input.js",
        line: 8,
        column: 22
    }
});
// --- effect ---
const effect = created.createEffect(()=>0, {
    sid: "c9o5ofaw",
    name: "effect",
    loc: {
        file: "input.js",
        line: 10,
        column: 15
    }
});
const effectShort = created.effect({
    handler: ()=>0
}, {
    sid: "4x9cgp9v",
    name: "effectShort",
    loc: {
        file: "input.js",
        line: 11,
        column: 20
    }
});
const effectImported = importedDomain.effect(()=>0, {
    sid: "6j6soyvn",
    name: "effectImported",
    loc: {
        file: "input.js",
        line: 12,
        column: 23
    },
    and: {
        name: "name"
    }
});
// --- store ---
const store = created.createStore(0, {
    sid: "8fbnytpo",
    name: "store",
    loc: {
        file: "input.js",
        line: 14,
        column: 14
    }
});
const storeShort = created.store(0, {
    sid: "6t20xnbl",
    name: "storeShort",
    loc: {
        file: "input.js",
        line: 15,
        column: 19
    },
    and: {
        name: "short"
    }
});
const storeImported = importedDomain.store("value", {
    sid: "3bzc7ypo",
    name: "storeImported",
    loc: {
        file: "input.js",
        line: 16,
        column: 22
    }
});
// --- domain ---
const domain = created.createDomain({
    sid: "1v960p74",
    name: "domain",
    loc: {
        file: "input.js",
        line: 18,
        column: 15
    }
});
const domainShort = created.domain("name", {
    sid: "cacpzqd0",
    name: "domainShort",
    loc: {
        file: "input.js",
        line: 19,
        column: 20
    }
});
const domainImported = importedDomain.domain({
    sid: "ar3q9cle",
    name: "domainImported",
    loc: {
        file: "input.js",
        line: 20,
        column: 23
    }
});
