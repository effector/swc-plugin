import { withFactory as _effector$factory } from 'effector';
import { useUnit } from "effector-react";
import { reflect } from "@effector/reflect";
// --- reflect/enabled ---
const Name = _effector$factory({
    sid: "9cpz6z07",
    name: "Name",
    method: "reflect",
    fn: ()=>reflect({
            view: Input,
            bind: {
                value: $name,
                placeholder: "Name"
            },
            useUnitConfig: {
                forceScope: true
            }
        })
});
// --- useUnit/disabled ---
useUnit($name);
