import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "90r73xj8",
    name: "$justValue"
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "agy6bc79",
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
    sid: "4vh1u7ju",
    name: "$external",
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "1osrx9hk",
    name: "$spread",
    and: {
        ...cfg
    }
});
// --- spread + member ---
const $spreadAndMember = createStore(0, {
    sid: "466cjumc",
    name: "$spreadAndMember",
    and: {
        ...cfg,
        skipVoid: true
    }
});
