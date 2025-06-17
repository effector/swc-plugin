import { createEvent, createStore, createEffect } from "effector";
import { invoke, createFactory } from "@withease/factories";

const correct = createFactory(() => {
  const $si = createStore(0);
  const ei = createEvent();
  const iFx = createEffect(() => {});

  return { $si, ei, iFx };
});

function incorrect() {
  const $si = createStore(0);
  const ei = createEvent();
  const iFx = createEffect(() => {});

  return { $si, ei, iFx };
}

const arrow = () => createStore(0);

export const $$model = {
  correct: invoke(correct),
  incorrect: incorrect(),

  arrow: arrow(),
};
