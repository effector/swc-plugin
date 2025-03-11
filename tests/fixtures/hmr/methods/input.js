import { createStore, createEvent } from "effector"

const $count = createStore(0)
const update = createEvent()
const reset = createEvent()

const $isOdd = $count.map(count => count % 2 == 1)

const decrement = update.prepend(() => -1)
const incremented = update.filter({ fn: (v) => v > 0 })

$count.on(update, (count, diff) => count + diff);

const $same = $count.on($isOdd.updates, (count) => count + 1).reset(reset)

$count.watch(console.log);
