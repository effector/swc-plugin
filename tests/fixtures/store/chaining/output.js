import { createEvent, createStore } from "effector";
const event = createEvent({
    sid: "3g0kdzwe",
    name: "event"
});
const $store = createStore(0, {
    sid: "cjscsjrm",
    name: "$store"
}).on(event, (_, value)=>value);
