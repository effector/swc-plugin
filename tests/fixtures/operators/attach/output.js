import { attach, createEffect } from "effector";
const effect = createEffect({
    sid: "cndz4qw8",
    name: "effect",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
const mapped = attach({
    and: {
        effect,
        mapParams: (_)=>_
    },
    or: {
        sid: "7o542bze",
        name: "mapped",
        loc: {
            file: "input.js",
            line: 5,
            column: 15
        }
    }
});
attach({
    and: {
        effect,
        mapParams: (_)=>_
    },
    or: {
        sid: "aldri54v",
        loc: {
            file: "input.js",
            line: 10,
            column: 0
        }
    }
});
const config = {
    effect,
    mapParams: (_)=>_
};
const configured = attach({
    and: config,
    or: {
        sid: "6ygjooai",
        name: "configured",
        loc: {
            file: "input.js",
            line: 20,
            column: 19
        }
    }
});
const f = ()=>attach({
        and: {
            effect,
            mapParams: (_)=>_
        },
        or: {
            sid: "9h38my3z",
            name: "f",
            loc: {
                file: "input.js",
                line: 23,
                column: 2
            }
        }
    });
{
    const incorrect = attach1(config);
    function attach1() {}
}{
    const attach = ()=>{};
    const incorrect = attach(config);
}{
    const attach = ()=>{};
    if (true) {
        const incorrect = attach(config);
    }
}
