import { withFactory as _effector$factory } from 'effector';
import { createEvent } from "effector";
import { debounce } from "patronum";
import { delay } from "patronum/delay";
import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";
const event = createEvent({
    sid: "9j09yk4e",
    name: "event"
});
_effector$factory({
    sid: "20mmd8hp",
    method: "debounce",
    fn: ()=>debounce({
            source: _effector$factory({
                sid: "4koaoy7k",
                name: "source",
                method: "invoke",
                fn: ()=>invoke(()=>createCounter({
                            value: _effector$factory({
                                sid: "9uz78soe",
                                name: "value",
                                method: "delay",
                                fn: ()=>delay(event, 100)
                            })
                        }))
            }),
            timeout: 100,
            target: _effector$factory({
                sid: "3yo7o5ao",
                name: "target",
                method: "createQuery",
                fn: ()=>createQuery({
                        handler: async ()=>null
                    })
            }).start
        })
});
