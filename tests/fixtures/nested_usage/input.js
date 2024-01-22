import { sample, restore, createStore, createEvent } from "effector";

function createTarget(source) {
  return restore(source(), 0);
}

sample({
  clock: createEvent(),
  filter: createStore(true),
  target: createTarget(() => createEvent()),
});
