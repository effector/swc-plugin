import { createEvent } from "effector";
import { debounce } from "patronum";
import { delay } from "patronum/delay";

import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";

const event = createEvent();

debounce({
  source: invoke(() => createCounter({ value: delay(event, 100) })),
  timeout: 100,
  target: createQuery({ handler: async () => null }).start,
});
