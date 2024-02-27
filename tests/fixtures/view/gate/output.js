import { createGate } from "effector-react";
const Gate = createGate({
    and: [],
    or: {
        sid: "6ag63fmk",
        name: "Gate"
    }
});
const NamedGate = createGate({
    and: [
        "name"
    ],
    or: {
        sid: "9m5j9qe0",
        name: "NamedGate"
    }
});
const ConfiguredGate = createGate({
    and: [
        {
            name: "name"
        }
    ],
    or: {
        sid: "4dciz7xp",
        name: "ConfiguredGate"
    }
});
const DeafultPropsGate = createGate({
    and: [
        "name",
        {
            x: 1
        }
    ],
    or: {
        sid: "6eq1w8ui",
        name: "DeafultPropsGate"
    }
});
