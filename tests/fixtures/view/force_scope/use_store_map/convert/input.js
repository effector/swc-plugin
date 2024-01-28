import { useStoreMap } from "effector-react";
// === useStoreMap ===
// Should convert these to an object form, then push literal
useStoreMap($store, (a) => 1);
useStoreMap($store, fn);
useStoreMap($store, (a) => 1);
useStoreMap($store, (a, b) => 1);
useStoreMap($store, (a, [b, c]) => 1);
useStoreMap($store, function (a, [b, c]) {
  return 1;
});
useStoreMap($store, function demo(a, [b, c]) {
  return 1;
});
