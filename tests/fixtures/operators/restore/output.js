import { restore, createEffect, createEvent } from "effector";
const fx = createEffect({
    sid: "2m2o585b",
    name: "fx",
    loc: {
        file: "input.js",
        line: 2,
        column: 11
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
// --- valid ---
const $restored = restore(fx, 0, {
    sid: "7zcnjxiw",
    name: "$restored",
    loc: {
        file: "input.js",
        line: 5,
        column: 18
    }
});
// --- valid ---
const $restoredEvent = restore(event, 0, {
    sid: "c1q5sz5r",
    name: "$restoredEvent",
    loc: {
        file: "input.js",
        line: 7,
        column: 23
    }
});
// --- valid ---
const $restoredConfig = restore(fx, 0, {
    sid: "7m3xkodc",
    name: "$restoredConfig",
    loc: {
        file: "input.js",
        line: 9,
        column: 24
    },
    and: {
        name: "old"
    }
});
// --- invalid: single ---
const $restoredOneArg = restore(fx);
