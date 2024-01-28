import { useEvent, useStore } from "effector-react";
// --- useEvent ---
useEvent();
useEvent(1, 2, 3);
useEvent(some, {
    forceScope: true
});
// --- useStore ---
useStore();
useStore(1, 2, 3);
useStore($store, {
    forceScope: true
});
