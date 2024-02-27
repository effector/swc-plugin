import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "90r73xj8",
    loc: {
        file: "input.js",
        line: 3,
        column: 19
    }
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "agy6bc79",
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
    sid: "4vh1u7ju",
    loc: {
        file: "input.js",
        line: 13,
        column: 18
    },
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "1osrx9hk",
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
    sid: "466cjumc",
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
