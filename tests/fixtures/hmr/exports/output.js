import { withRegion as _effector$withRegion, clearNode as _effector$clearNode, createNode as _effector$createNode } from 'effector';
const _effector$region = _effector$createNode();
import { withFactory as _effector$factory } from 'effector';
import { createEvent, createStore, createEffect } from "effector";
import { invoke } from "@withease/factories";
export var $var;
export const $store = _effector$withRegion(_effector$region, ()=>createStore("", {
        sid: "a0qxuyf0"
    }));
export let effectFx = _effector$withRegion(_effector$region, ()=>createEffect({
        sid: "d5v00uhy"
    }));
export default _effector$withRegion(_effector$region, ()=>createEvent({
        sid: "70k1qbs7"
    }));
export const $$model = _effector$withRegion(_effector$region, ()=>_effector$factory({
        sid: "biutajoy",
        fn: ()=>invoke(()=>({
                    event: createEvent({
                        sid: "c4g1bbvz"
                    })
                }))
    }));
$var = _effector$withRegion(_effector$region, ()=>createStore(0, {
        sid: "33om66sn"
    }));
if (import.meta.hot) import.meta.hot.dispose(()=>_effector$clearNode(_effector$region));
