import { sample, createStore, createEvent } from "effector"

const $count = createStore(0)
const increment = createEvent()

if (true) {
  sample({
    clock: increment,
    source: $count,
    fn: (count) => count + 1,
    target: $count,
  })
}
