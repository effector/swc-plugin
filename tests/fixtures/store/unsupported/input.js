import { createStore } from "effector";
// --- Spread ---
// --- arg (treat as no spread) ---
const $spreadFirstArg = createStore(...[0]);
// --- two args (treat as no spread) ---
const $spreadFirstArgs = createStore(...[0, { name: "name" }]);
// --- second arg (skip) ---
const $spreadSecondArg = createStore(0, ...[{ name: "name" }]);
// --- second two args (skip) ---
const $spreadSecondArgs = createStore(
  0,
  ...[{ name: "name" }, { other: true }],
);
