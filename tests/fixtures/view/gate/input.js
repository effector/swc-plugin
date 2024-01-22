import { createGate } from "effector-react";

const Gate = createGate()
const NamedGate = createGate("name")
const ConfiguredGate = createGate({ name: "name" })
const DeafultPropsGate = createGate("name", { x: 1 })
