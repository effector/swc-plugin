import { useGate } from "effector-react";
// === useGate ===
useGate();
useGate(1, 2, 3);
useGate(Gate, {}, {
    forceScope: true
});
useGate(Gate, {}, {
    forceScope: true
});
useGate(Gate, 1, {
    forceScope: true
});
useGate(Gate, {
    a: 1
}, {
    forceScope: true
});
