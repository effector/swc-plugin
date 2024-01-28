import { useUnit } from "effector-react";
// === useUnit ===
// --- invalid ---
useUnit();
useUnit(1, 2, 3);
// --- valid: push ---
useUnit({}, {
    forceScope: true
});
useUnit({
    a: $foo
}, {
    forceScope: true
});
useUnit([], {
    forceScope: true
});
useUnit([
    $foo
], {
    forceScope: true
});
useUnit($another, {
    forceScope: true
});
