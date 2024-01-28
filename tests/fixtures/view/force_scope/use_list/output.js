import { useList } from "effector-react";
// === useList ===
// --- invalid ---
useList();
useList($store);
useList(1, 2, 3);
// --- valid ---
useList($store, fn, {
    forceScope: true
});
useList($store, (a)=>1, {
    forceScope: true
});
useList($store, {
    fn: ()=>1
}, {
    forceScope: true
});
useList($store, {
    fn: ()=>1,
    keys: []
}, {
    forceScope: true
});
useList($store, {
    fn () {
        return 1;
    }
}, {
    forceScope: true
});
