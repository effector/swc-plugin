import { withRegion as _effector$withRegion, clearNode as _effector$clearNode, createNode as _effector$createNode } from 'effector';
const _effector$region = _effector$createNode({
    regional: true
});
import { withFactory as _effector$factory } from 'effector';
import { createEvent, createStore, createEffect } from "effector";
import { invoke, createFactory } from "@withease/factories";
const correct = _effector$withRegion(_effector$region, ()=>_effector$factory({
        sid: "2892eeus",
        fn: ()=>createFactory(()=>{
                const $si = createStore(0, {
                    sid: "4pb4z0y3"
                });
                const ei = createEvent({
                    sid: "8h86066l"
                });
                const iFx = createEffect(()=>{}, {
                    sid: "bs7fi7aq"
                });
                return {
                    $si,
                    ei,
                    iFx
                };
            })
    }));
function incorrect() {
    const $si = createStore(0, {
        sid: "4b0txldm"
    });
    const ei = createEvent({
        sid: "7qs8axzo"
    });
    const iFx = createEffect(()=>{}, {
        sid: "a9h6o4rv"
    });
    return {
        $si,
        ei,
        iFx
    };
}
const arrow = ()=>createStore(0, {
        sid: "gbyi551"
    });
export const $$model = {
    correct: _effector$withRegion(_effector$region, ()=>_effector$factory({
            sid: "bz30rfup",
            fn: ()=>invoke(correct)
        })),
    incorrect: incorrect(),
    arrow: arrow()
};
if (module.hot) module.hot.dispose(()=>_effector$clearNode(_effector$region));
