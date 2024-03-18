import { createStore } from "effector";
const $value = createStore("foo", {
    sid: "dxbjp5qx",
    name: "$value",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
const $withEmptyConfig = createStore("h", {
    sid: "clrd04ze",
    name: "$withEmptyConfig",
    loc: {
        file: "input.js",
        line: 4,
        column: 25
    },
    and: {}
});
const $withInvalidConfig = createStore("h", {
    sid: "6snzok8i",
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
    sid: "4cik63it",
    name: "$withExternalConfig",
    loc: {
        file: "input.js",
        line: 8,
        column: 28
    },
    and: config
});
const f = (a)=>createStore(a, {
        sid: "55b7cfsx",
        name: "f",
        loc: {
            file: "input.js",
            line: 10,
            column: 17
        }
    });
const { sid } = createStore(null, {
    sid: "9zlwmxtd",
    loc: {
        file: "input.js",
        line: 12,
        column: 16
    }
});
const { shortName } = createStore(null, {
    sid: "5qk6y8od",
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
    sid: "btvipg1t",
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
