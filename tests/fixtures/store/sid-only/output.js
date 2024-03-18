import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0, {
    sid: "5kqadt3t"
});
// --- valid: merge config ---
const $valueAndConfig = createStore(0, {
    sid: "9qgw6w16",
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
    and: cfg
});
// --- spread ---
const $spread = createStore(0, {
    sid: "aq6rt9kx",
    and: {
        ...cfg
    }
});
// --- spread + member ---
const $spreadAndMember = createStore(0, {
    sid: "1q965tgz",
    and: {
        ...cfg,
        skipVoid: true
    }
});
