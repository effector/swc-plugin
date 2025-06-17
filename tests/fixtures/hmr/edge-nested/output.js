import { withRegion as _effector$withRegion, clearNode as _effector$clearNode, createNode as _effector$createNode } from 'effector';
const _effector$region = _effector$createNode({
    regional: true
});
import { sample, createStore, createEvent } from "effector";
const $count = _effector$withRegion(_effector$region, ()=>createStore(0, {
        sid: "8iyytmbq"
    }));
const increment = _effector$withRegion(_effector$region, ()=>createEvent({
        sid: "djprtr5t"
    }));
if (true) {
    _effector$withRegion(_effector$region, ()=>sample({
            and: [
                {
                    clock: increment,
                    source: $count,
                    fn: (count)=>count + 1,
                    target: $count
                }
            ],
            or: {
                sid: "7bpxss3h"
            }
        }));
}
if (module.hot) module.hot.dispose(()=>_effector$clearNode(_effector$region));
