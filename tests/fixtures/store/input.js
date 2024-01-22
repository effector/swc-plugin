import { createStore } from "effector";
// --- valid: push config ---
const $justValue = createStore(0);
// --- valid: merge config ---
const $valueAndConfig = createStore(0, { name: "second-custom" });
// --- invalid: no value ---
const $invalid = createStore();
// ---
// complex cases
// ---
const cfg = { name: "external" };
// --- inline ---
const $external = createStore(0, cfg);
// --- spread ---
const $spread = createStore(0, { ...cfg });
// --- spread + member ---
const $spreadAndMember = createStore(0, { ...cfg, skipVoid: true });
