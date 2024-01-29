import { withFactory as _effector$factory } from 'effector';
import { useUnit } from "effector-react";
import { reflect } from "@effector/reflect";
// --- reflect/disabled ---
const Name = _effector$factory({
    sid: "223ghfvv",
    name: "Name",
    method: "reflect",
    fn: ()=>reflect({
            view: Input,
            bind: {
                value: $name,
                placeholder: "Name"
            }
        })
});
// --- useUnit/enabled ---
useUnit($name, {
    forceScope: true
});
