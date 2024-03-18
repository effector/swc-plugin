import { createStore } from "effector";
// --- Spread ---
// --- arg (treat as no spread) ---
const $spreadFirstArg = createStore(...[
    0
], {
    sid: "q325jpz"
});
// --- two args (treat as no spread) ---
const $spreadFirstArgs = createStore(...[
    0,
    {
        name: "name"
    }
], {
    sid: "j8sm1d1"
});
// --- second arg (skip) ---
const $spreadSecondArg = createStore(0, {
    sid: "7ktivjjz"
});
// --- second two args (skip) ---
const $spreadSecondArgs = createStore(0, {
    sid: "63n5jhl3"
});
