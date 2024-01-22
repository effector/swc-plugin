import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect();
// --- valid: with name ---
const name = createEffect("name");
// --- valid: handler ---
const handler = createEffect(() => 0);
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", { handler: () => 0 });
// --- valid: config only ---
const config = createEffect({ name: "name", handler: () => 0 });
// --- valid: with config ---
const configured = createEffect({ name: "name" });
