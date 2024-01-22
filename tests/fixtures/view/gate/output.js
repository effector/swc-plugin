import { createGate } from "effector-react";
const Gate = createGate({
    and: [],
    or: {
        sid: "7sz8b7vu",
        name: "Gate"
    }
});
const NamedGate = createGate({
    and: [
        "name"
    ],
    or: {
        sid: "7cesu214",
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
        sid: "btjux29a",
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
        sid: "adw5rfgl",
        name: "DeafultPropsGate"
    }
});
