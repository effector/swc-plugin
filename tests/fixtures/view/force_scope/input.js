import { useUnit, createStore } from "effector-react";

const $store = createStore(0);
// --- valid: regular ---
const data1 = useUnit($store);
// --- valid: override ---
const data2 = useUnit($store, { forceScope: false });
// --- invalid: no arg ---
const data3 = useUnit();
