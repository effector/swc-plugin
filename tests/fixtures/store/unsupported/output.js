import { createStore } from "effector";
// --- Spread ---
// --- arg (treat as no spread) ---
const $spreadFirstArg = createStore(...[
    0
], {
    sid: "4ute7vd3"
});
// --- two args (treat as no spread) ---
const $spreadFirstArgs = createStore(...[
    0,
    {
        name: "name"
    }
], {
    sid: "10nbrbwj"
});
// --- second arg (skip) ---
const $spreadSecondArg = createStore(0, {
    sid: "am0qkxck"
});
// --- second two args (skip) ---
const $spreadSecondArgs = createStore(0, {
    sid: "5k1ziouj"
});
