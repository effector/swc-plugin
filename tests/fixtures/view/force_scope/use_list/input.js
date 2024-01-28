import { useList } from "effector-react";
// === useList ===
// --- invalid ---
useList();
useList($store);
useList(1, 2, 3);
// --- valid ---
useList($store, fn);
useList($store, (a) => 1);
useList($store, { fn: () => 1 });
useList($store, { fn: () => 1, keys: [] });
useList($store, {
  fn() {
    return 1;
  },
});
