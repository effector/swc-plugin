import { createDomain } from "effector";
import { importedDomain } from "./local-file";
const created = createDomain("created", {
    sid: "3zl1hsak",
    name: "created",
    loc: {
        file: "input.js",
        line: 4,
        column: 16
    }
});
// --- event ---
const event = created.createEvent({
    sid: "980954pz",
    name: "event",
    loc: {
        file: "input.js",
        line: 6,
        column: 14
    }
});
const eventShort = created.event({
    sid: "dufk6dk",
    name: "eventShort",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
const eventImported = importedDomain.event("name", {
    sid: "3lwimmxz",
    name: "eventImported",
    loc: {
        file: "input.js",
        line: 8,
        column: 22
    }
});
// --- effect ---
const effect = created.createEffect(()=>0, {
    sid: "2yyrojar",
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
    sid: "9ctpv9fz",
    name: "effectShort",
    loc: {
        file: "input.js",
        line: 11,
        column: 20
    }
});
const effectImported = importedDomain.effect(()=>0, {
    sid: "4r5akc1z",
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
    sid: "8jd5pb7y",
    name: "store",
    loc: {
        file: "input.js",
        line: 14,
        column: 14
    }
});
const storeShort = created.store(0, {
    sid: "1trxawgn",
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
    sid: "cbvp5hc2",
    name: "storeImported",
    loc: {
        file: "input.js",
        line: 16,
        column: 22
    }
});
// --- domain ---
const domain = created.createDomain({
    sid: "564srhru",
    name: "domain",
    loc: {
        file: "input.js",
        line: 18,
        column: 15
    }
});
const domainShort = created.domain("name", {
    sid: "9tg5vkce",
    name: "domainShort",
    loc: {
        file: "input.js",
        line: 19,
        column: 20
    }
});
const domainImported = importedDomain.domain({
    sid: "8u0b6dts",
    name: "domainImported",
    loc: {
        file: "input.js",
        line: 20,
        column: 23
    }
});
