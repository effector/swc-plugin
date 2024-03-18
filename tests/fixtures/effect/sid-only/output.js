import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect({
    sid: "4624hnhi"
});
// --- valid: with name ---
const name = createEffect("name", {
    sid: "522356ng"
});
// --- valid: handler ---
const handler = createEffect(()=>0, {
    sid: "9a72uc30"
});
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", {
    sid: "7c5gx1a8",
    and: {
        handler: ()=>0
    }
});
// --- valid: config only ---
const config = createEffect({
    name: "name",
    handler: ()=>0
}, {
    sid: "4eocjumk"
});
// --- valid: with config ---
const configured = createEffect({
    name: "name"
}, {
    sid: "5stbtlct"
});
