import { useUnit, createStore } from "effector-react";
const $store = createStore(0, {
    sid: "b3r0afl0",
    name: "$store"
});
// --- valid: regular ---
const data1 = useUnit($store, {
    forceScope: true
});
// --- valid: override ---
const data2 = useUnit($store, {
    forceScope: false
});
// --- invalid: no arg ---
const data3 = useUnit();
