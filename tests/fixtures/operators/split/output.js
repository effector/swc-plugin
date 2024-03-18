import { createStore, createEvent, split } from "effector";
// === split ===
const $store = createStore([], {
    sid: "3ngkjtvv",
    name: "$store"
});
const event = createEvent({
    sid: "40n0pzc1",
    name: "event"
});
// --- split object ---
const splitObject = split({
    and: [
        $store,
        {
            empty: (list)=>list.length === 0
        }
    ],
    or: {
        sid: "alzldbcz"
    }
});
// --- split object: anonymous ---
split({
    and: [
        $store,
        {
            empty: (list)=>list.length === 0
        }
    ],
    or: {
        sid: "3k1f5zk5"
    }
});
// --- split with cases ---
const splitCases = split({
    and: [
        {
            source: $store,
            match: {
                empty: (list)=>list.length === 0
            },
            cases: {
                empty: event
            }
        }
    ],
    or: {
        sid: "5t6bbkha"
    }
});
// --- split with cases: anonymous ---
split({
    and: [
        {
            source: $store,
            match: {
                empty: (list)=>list.length === 0
            },
            cases: {
                empty: event
            }
        }
    ],
    or: {
        sid: "78127o6e"
    }
});
// --- split + spread args ---
const spread = [
    $store,
    {
        empty: (list)=>list.length === 0
    }
];
const splitWithSpread = split({
    and: [
        ...spread
    ],
    or: {
        sid: "8gfvtpiq"
    }
});
// --- split + defined config ---
const config = {
    source: $store,
    match: {
        empty: (list)=>list.length === 0
    },
    cases: {
        empty: event
    }
};
const splitWithConfig = split({
    and: [
        config
    ],
    or: {
        sid: "cyw3f3jj"
    }
});
// --- split: factory ---
const f = ()=>split({
        and: [
            $store,
            {
                empty: (list)=>list.length === 0
            }
        ],
        or: {
            sid: "dalqx79o"
        }
    });
// --- split: shadowed ---
{
    // --- split: shadowed with fn ---
    split1({
        source: $store,
        match: {
            empty: (list)=>list.length === 0
        },
        cases: {
            empty: event
        }
    });
    function split1() {}
}// --- split: shadowed with variable ---
{
    const split = ()=>{};
    if (true) {
        split({
            source: $store,
            match: {
                empty: (list)=>list.length === 0
            },
            cases: {
                empty: event
            }
        });
    }
}
