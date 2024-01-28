import { useEvent, useStore } from "effector-react";
// --- useEvent ---
useEvent();
useEvent(1, 2, 3);
useEvent(some);
// --- useStore ---
useStore();
useStore(1, 2, 3);
useStore($store);
