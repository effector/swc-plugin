import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "7lc86mpg"
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "83ybljqp"
});
// --- valid: with config ---
const configured = createEvent({
    name: "name"
}, {
    sid: "4pallxa9"
});
// --- valid: member ---
object.test = createEvent({
    sid: "7vjbygjx"
});
