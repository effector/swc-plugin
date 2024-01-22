import { createStore } from "effector";

const $value = createStore("foo");
const $withEmptyConfig = createStore("h", {});
const $withInvalidConfig = createStore("h", 23020);

const config = { option: 0 };
const $withExternalConfig = createStore(null, config);

const f = (a) => createStore(a);

const { sid } = createStore(null);
const { shortName } = createStore(null, { name: "foo" });

createStore(null);

// --- shadowing ---
{
  const incorrect = createStore(null);

  function createStore() {}
}

{
  const createStore = () => {};
  if (true) {
    const incorrect = createStore(null);
  }
}
