import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "4624hnhi",
    loc: {
        file: "input.js",
        line: 3,
        column: 14
    }
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "3tz9t0f7",
    loc: {
        file: "input.js",
        line: 5,
        column: 14
    }
});
// --- valid: with config ---
const configured = createEvent({
    name: "name"
}, {
    sid: "2i69vxt1",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
// --- valid: member ---
object.test = createEvent({
    sid: "k3td4nn",
    loc: {
        file: "input.js",
        line: 9,
        column: 14
    }
});
