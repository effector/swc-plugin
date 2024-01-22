import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "9ptdyw9i",
    name: "empty"
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "3xqv49y6",
    name: "named"
});
// --- valid: with config ---
const configured = createEvent({
    name: "name"
}, {
    sid: "c4qjkowi",
    name: "configured"
});
