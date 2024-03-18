import { createGate } from "effector-react";
const Gate = createGate({
    and: [],
    or: {
        sid: "b91f0f77",
        name: "Gate"
    }
});
const NamedGate = createGate({
    and: [
        "name"
    ],
    or: {
        sid: "1gjrk32i",
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
        sid: "9k88jfo5",
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
        sid: "7160dxk1",
        name: "DeafultPropsGate"
    }
});
