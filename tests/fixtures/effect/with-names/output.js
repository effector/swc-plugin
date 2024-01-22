import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect({
    sid: "9ptdyw9i",
    name: "empty"
});
// --- valid: with name ---
const name = createEffect("name", {
    sid: "8s95qlim",
    name: "name"
});
// --- valid: handler ---
const handler = createEffect(()=>0, {
    sid: "b2tfp94t",
    name: "handler"
});
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", {
    sid: "dws1ocgl",
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
    sid: "cpqt48lo",
    name: "config"
});
// --- valid: with config ---
const configured = createEffect({
    name: "name"
}, {
    sid: "dnxj1e12",
    name: "configured"
});
