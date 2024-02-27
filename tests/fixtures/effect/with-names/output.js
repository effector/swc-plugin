import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect({
    sid: "7lc86mpg",
    name: "empty"
});
// --- valid: with name ---
const name = createEffect("name", {
    sid: "44o0xf6c",
    name: "name"
});
// --- valid: handler ---
const handler = createEffect(()=>0, {
    sid: "b52dng93",
    name: "handler"
});
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", {
    sid: "9aogr3ia",
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
    sid: "6wo0jscf",
    name: "config"
});
// --- valid: with config ---
const configured = createEffect({
    name: "name"
}, {
    sid: "7dgd9kso",
    name: "configured"
});
