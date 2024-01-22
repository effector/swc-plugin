import { withFactory as _effector$factory } from 'effector';
import { debounce } from "patronum";
import { delay } from "patronum/delay";
import { createQuery } from "@farfetched/core";
import { invoke } from "@withease/factories";
import { createCounter } from "./some-file";
const q = _effector$factory({
    sid: "6bnps52z",
    name: "q",
    loc: {
        file: "input.js",
        line: 9,
        column: 10
    },
    method: "createQuery",
    fn: ()=>createQuery({
            handler: async ()=>null
        })
});
_effector$factory({
    sid: "7kr29sob",
    loc: {
        file: "input.js",
        line: 11,
        column: 0
    },
    method: "debounce",
    fn: ()=>debounce({
            source: q,
            timeout: 100,
            target: q.refresh
        })
});
_effector$factory({
    sid: "289fb367",
    loc: {
        file: "input.js",
        line: 17,
        column: 0
    },
    method: "delay",
    fn: ()=>delay({
            source: q,
            timeout: 100,
            target: q.refresh
        })
});
const counter = _effector$factory({
    sid: "a18ytq02",
    name: "counter",
    loc: {
        file: "input.js",
        line: 23,
        column: 16
    },
    method: "invoke",
    fn: ()=>invoke(createCounter, {
            value: 2
        })
});
const counterFn = _effector$factory({
    sid: "dc1mlb9b",
    name: "counterFn",
    loc: {
        file: "input.js",
        line: 24,
        column: 18
    },
    method: "invoke",
    fn: ()=>invoke(()=>createCounter({
                value: 2
            }))
});
