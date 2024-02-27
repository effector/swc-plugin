import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "7lc86mpg",
    loc: {
        file: "input.js",
        line: 3,
        column: 14
    }
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "83ybljqp",
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
    sid: "4pallxa9",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
// --- valid: member ---
object.test = createEvent({
    sid: "7vjbygjx",
    loc: {
        file: "input.js",
        line: 9,
        column: 14
    }
});
