import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "csony271"
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "c0dl862u",
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
    sid: "bzpmei7g",
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "6wyvv8o9",
    and: {
        ...cfg
    }
});
// --- spread + member ---
const $spreadAndMember = createStore(0, {
    sid: "dl0rdtrm",
    and: {
        ...cfg,
        skipVoid: true
    }
});
