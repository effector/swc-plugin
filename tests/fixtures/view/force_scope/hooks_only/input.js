import { useUnit } from "effector-react";
import { reflect } from "@effector/reflect";
// --- reflect/disabled ---
const Name = reflect({
  view: Input,
  bind: { value: $name, placeholder: "Name" },
});
// --- useUnit/enabled ---
useUnit($name);
