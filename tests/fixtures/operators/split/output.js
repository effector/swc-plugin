import { createStore, createEvent, split } from "effector";
// === split ===
const $store = createStore([], {
    sid: "b3r0afl0",
    name: "$store"
});
const event = createEvent({
    sid: "bzcev560",
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
        sid: "79ojgnns"
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
        sid: "c4bj4aph"
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
        sid: "aw0sxrhc"
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
        sid: "tfht9d3"
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
        sid: "bgxn6mpn"
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
        sid: "4zfv1gas"
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
            sid: "2ynqrlh"
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
