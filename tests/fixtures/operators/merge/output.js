import { merge, createStore, createEvent } from "effector";
const $store = createStore(0, {
    sid: "2aam2jk3",
    name: "$store",
    loc: {
        file: "input.js",
        line: 2,
        column: 15
    }
});
const event = createEvent({
    sid: "7siolh7i",
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
    sid: "dmsll98p",
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
    sid: "350xijs7",
    name: "mergedSpread",
    loc: {
        file: "input.js",
        line: 7,
        column: 21
    }
});
