import { useStoreMap } from "effector-react";
// === useStoreMap ===
// should detect existing `forceScope` and not override
// kv pair
useStoreMap({
  forceScope: false,
  store: $store,
  keys: [b, c],
  fn: (a) => 1,
});
// shorthand
useStoreMap({
  forceScope,
  store: $store,
  keys: [],
  fn: (a) => 1,
});
