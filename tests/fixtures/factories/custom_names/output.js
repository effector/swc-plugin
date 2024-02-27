import { withFactory as _effector$factory } from 'effector';
import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";
const longer = _effector$factory({
    sid: "2zlyojb",
    name: "longer",
    method: "itIsALongName",
    fn: ()=>itIsALongName(0)
});
const arcade = _effector$factory({
    sid: "7z93h5xc",
    name: "arcade",
    method: "Defaulting",
    fn: ()=>Defaulting({
            source: longer,
            condition: _effector$factory({
                sid: "ayb5kwzr",
                name: "condition",
                method: "AnotherImport",
                fn: ()=>AnotherImport({
                        test: true
                    })
            })
        })
});
_effector$factory({
    sid: "yv2kbtk",
    method: "Randomizing",
    fn: ()=>Randomizing({
            arcade
        })
});
