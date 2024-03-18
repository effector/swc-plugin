import { merge, createStore, createEvent } from "effector";
const $store = createStore(0, {
    sid: "2x595b6k",
    name: "$store",
    loc: {
        file: "input.js",
        line: 2,
        column: 15
    }
});
const event = createEvent({
    sid: "3g0kdzwe",
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
    sid: "41l394fc",
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
    sid: "9hgg8vcf",
    name: "mergedSpread",
    loc: {
        file: "input.js",
        line: 7,
        column: 21
    }
});
