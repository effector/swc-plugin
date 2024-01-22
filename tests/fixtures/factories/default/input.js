import { debounce } from "patronum";
import { delay } from "patronum/delay";

import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";

import { createCounter } from "./some-file";

const q = createQuery({ handler: async () => null });

debounce({
  source: q,
  timeout: 100,
  target: q.refresh,
});

delay({
  source: q,
  timeout: 100,
  target: q.refresh,
});

const counter = invoke(createCounter, { value: 2 });
const counterFn = invoke(() => createCounter({ value: 2 }));
