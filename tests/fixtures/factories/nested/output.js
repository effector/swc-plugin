import { withFactory as _effector$factory } from 'effector';
import { createEvent } from "effector";
import { debounce } from "patronum";
import { delay } from "patronum/delay";
import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";
const event = createEvent({
    sid: "6cr249ft",
    name: "event"
});
_effector$factory({
    sid: "aldri54v",
    method: "debounce",
    fn: ()=>debounce({
            source: _effector$factory({
                sid: "92tlq4ri",
                name: "source",
                method: "invoke",
                fn: ()=>invoke(()=>createCounter({
                            value: _effector$factory({
                                sid: "2idxdye6",
                                name: "value",
                                method: "delay",
                                fn: ()=>delay(event, 100)
                            })
                        }))
            }),
            timeout: 100,
            target: _effector$factory({
                sid: "4y1fx40l",
                name: "target",
                method: "createQuery",
                fn: ()=>createQuery({
                        handler: async ()=>null
                    })
            }).start
        })
});
