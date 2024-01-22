import { merge, createStore, createEvent } from "effector";
const $store = createStore(0, {
    sid: "2r976i2e",
    name: "$store",
    loc: {
        file: "input.js",
        line: 2,
        column: 15
    }
});
const event = createEvent({
    sid: "8luqdo9f",
    name: "event",
    loc: {
        file: "input.js",
        line: 3,
        column: 14
    }
});
// --- merge ---
const merged = merge([
    event,
    $store.updates
], {
    sid: "d2zd864o",
    name: "merged",
    loc: {
        file: "input.js",
        line: 5,
        column: 15
    }
});
// --- merge: spread (invalid) ---
const mergedSpread = merge(...[
    event,
    $store.updates
], {
    sid: "dehl3abf",
    name: "mergedSpread",
    loc: {
        file: "input.js",
        line: 7,
        column: 21
    }
});
