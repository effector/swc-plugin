import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "csony271",
    name: "$justValue"
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "c0dl862u",
    name: "$valueAndConfig",
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
    name: "$external",
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "6wyvv8o9",
    name: "$spread",
    and: {
        ...cfg
    }
});
// --- spread + member ---
const $spreadAndMember = createStore(0, {
    sid: "dl0rdtrm",
    name: "$spreadAndMember",
    and: {
        ...cfg,
        skipVoid: true
    }
});
