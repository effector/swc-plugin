import { createEvent, createStore } from "effector";

const event = createEvent();
const $store = createStore(0).on(event, (_, value) => value);
