import {
  createEvent,
  createStore,
  sample,
  createEffect,
  attach,
  forward,
} from "effector";

const decrement = createEvent();

const $count = createStore(0);

const fx = createEffect(() => {});
const attachedFx = attach({ effect: fx });

const $store = sample({ clock: $count });

sample({
  clock: decrement,
  source: $store,
  fn: (count) => count - 1,
  target: $count,
});

forward({
  clock: $store.updates,
  target: attachedFx,
});
