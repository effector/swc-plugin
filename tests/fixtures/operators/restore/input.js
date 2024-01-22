import { restore, createEffect, createEvent } from "effector";
const fx = createEffect();
const event = createEvent();
// --- valid ---
const $restored = restore(fx, 0);
// --- valid ---
const $restoredEvent = restore(event, 0);
// --- valid ---
const $restoredConfig = restore(fx, 0, { name: "old" });
// --- invalid: single ---
const $restoredOneArg = restore(fx);
