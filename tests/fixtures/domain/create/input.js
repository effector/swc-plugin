import { createDomain } from "effector";
// --- valid: empty ---
const domain = createDomain();
// --- valid: named ---
const domainWithName = createDomain("name");
// --- valid: config ---
const domainWithConfig = createDomain({ name: "name" });
// --- valid: name + confug ---
const domainComplete = createDomain("name", { domain });
