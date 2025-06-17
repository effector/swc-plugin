import { withRegion as _effector$withRegion, clearNode as _effector$clearNode, createNode as _effector$createNode } from 'effector';
const _effector$region = _effector$createNode({
    regional: true
});
import { createStore, createEvent } from "effector";
const $count = _effector$withRegion(_effector$region, ()=>createStore(0, {
        sid: "8iyytmbq"
    }));
const update = _effector$withRegion(_effector$region, ()=>createEvent({
        sid: "262s37yl"
    }));
const reset = _effector$withRegion(_effector$region, ()=>createEvent({
        sid: "67l5wce4"
    }));
const $isOdd = _effector$withRegion(_effector$region, ()=>$count.map((count)=>count % 2 == 1));
const decrement = _effector$withRegion(_effector$region, ()=>update.prepend(()=>-1));
const incremented = _effector$withRegion(_effector$region, ()=>update.filter({
        fn: (v)=>v > 0
    }));
_effector$withRegion(_effector$region, ()=>$count.on(update, (count, diff)=>count + diff));
const $same = _effector$withRegion(_effector$region, ()=>$count.on($isOdd.updates, (count)=>count + 1).reset(reset));
_effector$withRegion(_effector$region, ()=>$count.watch(console.log));
if (module.hot) module.hot.dispose(()=>_effector$clearNode(_effector$region));
