import { createEvent, createStore } from "effector";
import { debounce, or, not } from "patronum";
import { delay } from "patronum/delay";

import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";

const event = createEvent();

debounce({
  source: invoke(() => createCounter({ value: delay(event, 100) })),
  timeout: 100,
  target: createQuery({ handler: async () => null }).start,
});

// --- nested `not` should not receive $c as `name` ---
const $a = createStore(true);
const $c = or($a, not($a));
