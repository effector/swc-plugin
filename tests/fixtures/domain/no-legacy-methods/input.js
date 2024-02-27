import { createDomain } from "effector";
import { importedDomain } from "./local-file";

const created = createDomain("created");
// --- event ---
const event = created.createEvent();
const eventShort = created.event();
const eventImported = importedDomain.event("name");
// --- effect ---
const effect = created.createEffect(() => 0);
const effectShort = created.effect({ handler: () => 0 });
const effectImported = importedDomain.effect(() => 0, { name: "name" });
// --- store ---
const store = created.createStore(0);
const storeShort = created.store(0, { name: "short" });
const storeImported = importedDomain.store("value");
// --- domain ---
const domain = created.createDomain();
const domainShort = created.domain("name");
const domainImported = importedDomain.domain();
// --- usage as argument ---
createDomain({ name: "second", domain: created });
