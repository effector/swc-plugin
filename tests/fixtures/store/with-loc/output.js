import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "5kqadt3t",
    loc: {
        file: "input.js",
        line: 3,
        column: 19
    }
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "9qgw6w16",
    loc: {
        file: "input.js",
        line: 5,
        column: 24
    },
    and: {
        name: "second-custom"
    }
});
// --- invalid: no value ---
const $invalid = createStore();
// ---
// complex cases
// ---
const cfg = {
    name: "external"
};
// --- inline ---
const $external = createStore(0, {
    sid: "8w56za02",
    loc: {
        file: "input.js",
        line: 13,
        column: 18
    },
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "aq6rt9kx",
    loc: {
        file: "input.js",
        line: 15,
        column: 16
    },
    and: {
        ...cfg
    }
});
// --- spread + member ---
const $spreadAndMember = createStore(0, {
    sid: "1q965tgz",
    loc: {
        file: "input.js",
        line: 17,
        column: 25
    },
    and: {
        ...cfg,
        skipVoid: true
    }
});
