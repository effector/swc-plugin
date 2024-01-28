import { useStoreMap } from "effector-react";
// === useStoreMap ===
// --- invalid ---
useStoreMap();
useStoreMap(1, 2, 3);
useStoreMap([])
// --- valid ---
useStoreMap({ store: $store, keys: [b, c], fn: (a) => 1 });
useStoreMap({ store: $store, keys: [b, c], fn });
useStoreMap({
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
  updateFilter: (u, c) => false,
});
useStoreMap({
  store: $store,
  keys: [b, c],
  fn: function (a, [b, c]) {
    return 1;
  },
});
