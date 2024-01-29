import { withFactory as _effector$factory } from 'effector';
import { reflect, list, variant } from "@effector/reflect";
// === reflect: insert ===
// --- reflect ---
const Name = _effector$factory({
    sid: "223ghfvv",
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
// --- variant ---
const Field = _effector$factory({
    sid: "cbgdj7iu",
    name: "Field",
    method: "variant",
    fn: ()=>variant({
            source: $fieldType,
            bind: {
                onChange: valueChanged,
                value: $value
            },
            cases: {
                date: DateSelector,
                number: ()=>null
            },
            default: TextInput,
            useUnitConfig: {
                forceScope: true
            }
        })
});
// --- list ---
const Items = _effector$factory({
    sid: "5db4kq9a",
    name: "Items",
    method: "list",
    fn: ()=>list({
            view: Item,
            source: $users,
            bind: {
                color: $color
            },
            mapItem: {
                id: (user)=>user.id,
                name: (user)=>user.name
            },
            getKey: (user)=>`${user.id}${user.name}`,
            useUnitConfig: {
                forceScope: true
            }
        })
});
// === reflect: skip ===
// --- reflect ---
const NameInvalid = _effector$factory({
    sid: "2jxnq7m",
    name: "NameInvalid",
    method: "reflect",
    fn: ()=>reflect({
            view: Input,
            bind: {
                value: $name,
                placeholder: "Name"
            },
            useUnitConfig: {}
        })
});
// --- variant ---
const FieldInvalid = _effector$factory({
    sid: "4ny3ibb",
    name: "FieldInvalid",
    method: "variant",
    fn: ()=>variant({
            source: $fieldType,
            cases: {
                date: DateSelector,
                number: ()=>null
            },
            useUnitConfig: {
                forceScope: false
            }
        })
});
// --- list ---
const ItemsInvalid = _effector$factory({
    sid: "1fenkbjh",
    name: "ItemsInvalid",
    method: "list",
    fn: ()=>list({
            view: Item,
            source: $users,
            bind: {
                color: $color
            },
            getKey: (user)=>user.id,
            useUnitConfig: {
                forceScope: false
            }
        })
});
