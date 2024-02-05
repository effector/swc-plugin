import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "9ptdyw9i",
    loc: {
        file: "input.js",
        line: 3,
        column: 14
    }
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "3xqv49y6",
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
    sid: "c4qjkowi",
    loc: {
        file: "input.js",
        line: 7,
        column: 19
    }
});
// --- valid: member ---
object.test = createEvent({
    sid: "zngkehk",
    loc: {
        file: "input.js",
        line: 9,
        column: 14
    }
});
