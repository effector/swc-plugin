import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";

const longer = itIsALongName(0);

const arcade = Defaulting({
  source: longer,
  condition: AnotherImport({ test: true }),
});

Randomizing({ arcade });
