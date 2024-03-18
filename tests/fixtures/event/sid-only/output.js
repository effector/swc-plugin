import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent({
    sid: "4624hnhi"
});
// --- valid: with name ---
const named = createEvent("name", {
    sid: "3tz9t0f7"
});
// --- valid: with config ---
const configured = createEvent({
    name: "name"
}, {
    sid: "2i69vxt1"
});
// --- valid: member ---
object.test = createEvent({
    sid: "k3td4nn"
});
