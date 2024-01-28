import { useUnit } from "effector-react";
// === useUnit ===
// --- invalid ---
useUnit();
useUnit(1, 2, 3);
// --- valid: push ---
useUnit({});
useUnit({ a: $foo });
useUnit([]);
useUnit([$foo]);
useUnit($another);
