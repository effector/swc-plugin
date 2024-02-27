import { createStore } from "effector";
const $value = createStore("foo", {
    sid: "bb4ti9x9",
    name: "$value",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
const $withEmptyConfig = createStore("h", {
    sid: "7y8ddele",
    name: "$withEmptyConfig",
    loc: {
        file: "input.js",
        line: 4,
        column: 25
    },
    and: {}
});
const $withInvalidConfig = createStore("h", {
    sid: "26n5y6ea",
    name: "$withInvalidConfig",
    loc: {
        file: "input.js",
        line: 5,
        column: 27
    },
    and: 23020
});
const config = {
    option: 0
};
const $withExternalConfig = createStore(null, {
    sid: "7kdpi9cl",
    name: "$withExternalConfig",
    loc: {
        file: "input.js",
        line: 8,
        column: 28
    },
    and: config
});
const f = (a)=>createStore(a, {
        sid: "cjrhplpi",
        name: "f",
        loc: {
            file: "input.js",
            line: 10,
            column: 17
        }
    });
const { sid } = createStore(null, {
    sid: "33sw2qqq",
    loc: {
        file: "input.js",
        line: 12,
        column: 16
    }
});
const { shortName } = createStore(null, {
    sid: "9xr4if67",
    loc: {
        file: "input.js",
        line: 13,
        column: 22
    },
    and: {
        name: "foo"
    }
});
createStore(null, {
    sid: "81i45o7c",
    loc: {
        file: "input.js",
        line: 15,
        column: 0
    }
});
// --- shadowing ---
{
    const incorrect = createStore1(null);
    function createStore1() {}
}{
    const createStore = ()=>{};
    if (true) {
        const incorrect = createStore(null);
    }
}
