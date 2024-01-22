import { createEvent } from "effector";
// --- valid: empty ---
const empty = createEvent();
// --- valid: with name ---
const named = createEvent("name");
// --- valid: with config ---
const configured = createEvent({ name: "name" });
