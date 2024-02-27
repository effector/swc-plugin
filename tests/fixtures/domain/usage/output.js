import { createDomain } from "effector";
import { importedDomain } from "./local-file";
const created = createDomain("created", {
    sid: "bm4rhtf8",
    name: "created",
    loc: {
        file: "input.js",
        line: 4,
        column: 16
    }
});
// --- event ---
const event = created.createEvent({
    sid: "729zmiav",
    name: "event",
    loc: {
        file: "input.js",
        line: 6,
        column: 14
    }
});
const eventShort = created.event({
    sid: "82tpseig",
    name: "eventShort",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
const eventImported = importedDomain.event("name", {
    sid: "5y1mh1r9",
    name: "eventImported",
    loc: {
        file: "input.js",
        line: 8,
        column: 22
    }
});
// --- effect ---
const effect = created.createEffect(()=>0, {
    sid: "cory6h0y",
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
    sid: "a0926b89",
    name: "effectShort",
    loc: {
        file: "input.js",
        line: 11,
        column: 20
    }
});
const effectImported = importedDomain.effect(()=>0, {
    sid: "ee7ah0j",
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
    sid: "5atweoq4",
    name: "store",
    loc: {
        file: "input.js",
        line: 14,
        column: 14
    }
});
const storeShort = created.store(0, {
    sid: "7x5eqhy6",
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
    sid: "3lois87m",
    name: "storeImported",
    loc: {
        file: "input.js",
        line: 16,
        column: 22
    }
});
// --- domain ---
const domain = created.createDomain({
    sid: "3jpfpi0w",
    name: "domain",
    loc: {
        file: "input.js",
        line: 18,
        column: 15
    }
});
const domainShort = created.domain("name", {
    sid: "66p6907l",
    name: "domainShort",
    loc: {
        file: "input.js",
        line: 19,
        column: 20
    }
});
const domainImported = importedDomain.domain({
    sid: "5trh5mnm",
    name: "domainImported",
    loc: {
        file: "input.js",
        line: 20,
        column: 23
    }
});
