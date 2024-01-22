import { createStore } from "effector";
const $value = createStore("foo", {
    sid: "3815teoc",
    name: "$value",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
const $withEmptyConfig = createStore("h", {
    sid: "cvg42qoc",
    name: "$withEmptyConfig",
    loc: {
        file: "input.js",
        line: 4,
        column: 25
    },
    and: {}
});
const $withInvalidConfig = createStore("h", {
    sid: "ukwm6t5",
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
    sid: "21flp3xc",
    name: "$withExternalConfig",
    loc: {
        file: "input.js",
        line: 8,
        column: 28
    },
    and: config
});
const f = (a)=>createStore(a, {
        sid: "cqoa2319",
        name: "f",
        loc: {
            file: "input.js",
            line: 10,
            column: 17
        }
    });
const { sid } = createStore(null, {
    sid: "bexbv9je",
    loc: {
        file: "input.js",
        line: 12,
        column: 16
    }
});
const { shortName } = createStore(null, {
    sid: "5q7usev5",
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
    sid: "3m8hsy22",
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
