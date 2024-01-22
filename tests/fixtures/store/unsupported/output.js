import { createStore } from "effector";
// --- Spread ---
// --- arg (treat as no spread) ---
const $spreadFirstArg = createStore(...[
    0
], {
    sid: "dvefs2n5"
});
// --- two args (treat as no spread) ---
const $spreadFirstArgs = createStore(...[
    0,
    {
        name: "name"
    }
], {
    sid: "ct470bdv"
});
// --- second arg (skip) ---
const $spreadSecondArg = createStore(0, {
    sid: "dcsdbysk"
});
// --- second two args (skip) ---
const $spreadSecondArgs = createStore(0, {
    sid: "2au5ez0h"
});
