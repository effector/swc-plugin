import { attach, createEffect } from "effector";

const effect = createEffect();

const mapped = attach({
  effect,
  mapParams: (_) => _,
});

attach({
  effect,
  mapParams: (_) => _,
});

const config = {
  effect,
  mapParams: (_) => _,
};

const configured = attach(config);

const f = () =>
  attach({
    effect,
    mapParams: (_) => _,
  });

{
  const incorrect = attach(config);

  function attach() {}
}

{
  const attach = () => {};

  const incorrect = attach(config);
}

{
  const attach = () => {};

  if (true) {
    const incorrect = attach(config);
  }
}
