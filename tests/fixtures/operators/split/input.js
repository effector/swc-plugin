import { createStore, createEvent, split } from "effector";
// === split ===
const $store = createStore([]);
const event = createEvent();
// --- split object ---
const splitObject = split($store, { empty: (list) => list.length === 0 });
// --- split object: anonymous ---
split($store, { empty: (list) => list.length === 0 });
// --- split with cases ---
const splitCases = split({
  source: $store,
  match: { empty: (list) => list.length === 0 },
  cases: { empty: event },
});
// --- split with cases: anonymous ---
split({
  source: $store,
  match: { empty: (list) => list.length === 0 },
  cases: { empty: event },
});
// --- split + spread args ---
const spread = [$store, { empty: (list) => list.length === 0 }];
const splitWithSpread = split(...spread);
// --- split + defined config ---
const config = {
  source: $store,
  match: { empty: (list) => list.length === 0 },
  cases: { empty: event },
};
const splitWithConfig = split(config);
// --- split: factory ---
const f = () => split($store, { empty: (list) => list.length === 0 });
// --- split: shadowed ---
{
  // --- split: shadowed with fn ---
  split({
    source: $store,
    match: { empty: (list) => list.length === 0 },
    cases: { empty: event },
  });

  function split() {}
}
// --- split: shadowed with variable ---
{
  const split = () => {};

  if (true) {
    split({
      source: $store,
      match: { empty: (list) => list.length === 0 },
      cases: { empty: event },
    });
  }
}
