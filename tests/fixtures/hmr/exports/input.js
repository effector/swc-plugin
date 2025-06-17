import { createEvent, createStore, createEffect } from "effector";
import { invoke } from "@withease/factories";

export var $var;

export const $store = createStore("");
export let effectFx = createEffect();

export default createEvent();

export const $$model = invoke(() => ({ event: createEvent() }));

$var = createStore(0);
