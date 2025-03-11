import { withRegion as _effector$withRegion, clearNode as _effector$clearNode, createNode as _effector$createNode } from 'effector';
const _effector$region = _effector$createNode();
import { createEvent, createStore, sample, createEffect, attach, forward } from "effector";
const decrement = _effector$withRegion(_effector$region, ()=>createEvent({
        sid: "4koojyr"
    }));
const $count = _effector$withRegion(_effector$region, ()=>createStore(0, {
        sid: "9srhzoiy"
    }));
const fx = _effector$withRegion(_effector$region, ()=>createEffect(()=>{}, {
        sid: "80wcg0gv"
    }));
const attachedFx = _effector$withRegion(_effector$region, ()=>attach({
        and: {
            effect: fx
        },
        or: {
            sid: "5tasuy4i"
        }
    }));
const $store = _effector$withRegion(_effector$region, ()=>sample({
        and: [
            {
                clock: $count
            }
        ],
        or: {
            sid: "32ttleyt"
        }
    }));
_effector$withRegion(_effector$region, ()=>sample({
        and: [
            {
                clock: decrement,
                source: $store,
                fn: (count)=>count - 1,
                target: $count
            }
        ],
        or: {
            sid: "1fuuxs6f"
        }
    }));
_effector$withRegion(_effector$region, ()=>forward({
        and: {
            clock: $store.updates,
            target: attachedFx
        },
        or: {
            sid: "9txefa7a"
        }
    }));
if (module.hot) module.hot.dispose(()=>_effector$clearNode(_effector$region));
