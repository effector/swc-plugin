import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "7lc86mpg",
    name: "empty"
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "83ybljqp",
    name: "named"
});
// --- valid: with config ---
const configured = createEvent({
    name: "name"
}, {
    sid: "4pallxa9",
    name: "configured"
});
// --- valid: member ---
object.test = createEvent({
    sid: "7vjbygjx",
    name: "test"
});
