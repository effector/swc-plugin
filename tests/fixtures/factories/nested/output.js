import { withFactory as _effector$factory } from 'effector';
import { createEvent } from "effector";
import { debounce } from "patronum";
import { delay } from "patronum/delay";
import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";
const event = createEvent({
    sid: "4y8xi7js",
    name: "event"
});
_effector$factory({
    sid: "e0a2ieoo",
    method: "debounce",
    fn: ()=>debounce({
            source: _effector$factory({
                sid: "dyyitvfo",
                name: "source",
                method: "invoke",
                fn: ()=>invoke(()=>createCounter({
                            value: _effector$factory({
                                sid: "5dc0th04",
                                name: "value",
                                method: "delay",
                                fn: ()=>delay(event, 100)
                            })
                        }))
            }),
            timeout: 100,
            target: _effector$factory({
                sid: "a2vwgccd",
                name: "target",
                method: "createQuery",
                fn: ()=>createQuery({
                        handler: async ()=>null
                    })
            }).start
        })
});
