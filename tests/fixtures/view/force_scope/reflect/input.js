import { reflect, list, variant } from "@effector/reflect";
// === reflect: insert ===
// --- reflect ---
const Name = reflect({
  view: Input,
  bind: { value: $name, placeholder: "Name" },
});
// --- variant ---
const Field = variant({
  source: $fieldType,
  bind: { onChange: valueChanged, value: $value },
  cases: { date: DateSelector, number: () => null },
  default: TextInput,
});
// --- list ---
const Items = list({
  view: Item,
  source: $users,
  bind: { color: $color },
  mapItem: {
    id: (user) => user.id,
    name: (user) => user.name,
  },
  getKey: (user) => `${user.id}${user.name}`,
});
// === reflect: skip ===
// --- reflect ---
const NameInvalid = reflect({
  view: Input,
  bind: { value: $name, placeholder: "Name" },
  useUnitConfig: {},
});
// --- variant ---
const FieldInvalid = variant({
  source: $fieldType,
  cases: { date: DateSelector, number: () => null },
  useUnitConfig: { forceScope: false },
});
// --- list ---
const ItemsInvalid = list({
  view: Item,
  source: $users,
  bind: { color: $color },
  getKey: (user) => user.id,
  useUnitConfig: { forceScope: false },
});
