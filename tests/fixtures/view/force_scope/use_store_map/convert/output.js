import { useStoreMap } from "effector-react";
// === useStoreMap ===
// Should convert these to an object form, then push literal
useStoreMap({
    store: $store,
    fn: (a)=>1,
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: fn,
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: (a)=>1,
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: (a, b)=>1,
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: (a, [b, c])=>1,
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: function(a, [b, c]) {
        return 1;
    },
    keys: [],
    forceScope: true
});
useStoreMap({
    store: $store,
    fn: function demo(a, [b, c]) {
        return 1;
    },
    keys: [],
    forceScope: true
});
