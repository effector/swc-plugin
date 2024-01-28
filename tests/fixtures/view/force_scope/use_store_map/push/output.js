import { useStoreMap } from "effector-react";
// === useStoreMap ===
// --- invalid ---
useStoreMap();
useStoreMap(1, 2, 3);
useStoreMap([]);
// --- valid ---
useStoreMap({
    forceScope: true,
    store: $store,
    keys: [
        b,
        c
    ],
    fn: (a)=>1
});
useStoreMap({
    forceScope: true,
    store: $store,
    keys: [
        b,
        c
    ],
    fn
});
useStoreMap({
    forceScope: true,
    store: $store,
    keys: [
        b,
        c
    ],
    fn: (a)=>1,
    updateFilter: (u, c1)=>false
});
useStoreMap({
    forceScope: true,
    store: $store,
    keys: [
        b,
        c
    ],
    fn: function(a, [b1, c1]) {
        return 1;
    }
});
