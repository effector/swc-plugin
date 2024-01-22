import { merge, createStore, createEvent } from "effector";
const $store = createStore(0);
const event = createEvent();
// --- merge ---
const merged = merge([event, $store.updates]);
// --- merge: spread (invalid) ---
const mergedSpread = merge(...[event, $store.updates]);
