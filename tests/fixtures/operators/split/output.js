import { createStore, createEvent, split } from "effector";
// === split ===
const $store = createStore([], {
    sid: "5a06gukk",
    name: "$store"
});
const event = createEvent({
    sid: "2xzrimp3",
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
        sid: "180b27in"
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
        sid: "3x1lpxcy"
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
        sid: "8c17t5ql"
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
        sid: "3wwh0z7l"
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
        sid: "55p3ab76"
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
        sid: "deijzwqh"
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
            sid: "ieu0mbd"
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
