import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect({
    sid: "4624hnhi",
    name: "empty"
});
// --- valid: with name ---
const name = createEffect("name", {
    sid: "522356ng",
    name: "name"
});
// --- valid: handler ---
const handler = createEffect(()=>0, {
    sid: "9a72uc30",
    name: "handler"
});
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", {
    sid: "7c5gx1a8",
    name: "nameAndConfig",
    and: {
        handler: ()=>0
    }
});
// --- valid: config only ---
const config = createEffect({
    name: "name",
    handler: ()=>0
}, {
    sid: "4eocjumk",
    name: "config"
});
// --- valid: with config ---
const configured = createEffect({
    name: "name"
}, {
    sid: "5stbtlct",
    name: "configured"
});
