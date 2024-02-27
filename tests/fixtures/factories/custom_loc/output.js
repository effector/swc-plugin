import { withFactory as _effector$factory } from 'effector';
import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";
const longer = _effector$factory({
    sid: "2zlyojb",
    name: "longer",
    loc: {
        file: "input.js",
        line: 4,
        column: 15
    },
    method: "itIsALongName",
    fn: ()=>itIsALongName(0)
});
const arcade = _effector$factory({
    sid: "7z93h5xc",
    name: "arcade",
    loc: {
        file: "input.js",
        line: 6,
        column: 15
    },
    method: "Defaulting",
    fn: ()=>Defaulting({
            source: longer,
            condition: _effector$factory({
                sid: "ayb5kwzr",
                name: "condition",
                loc: {
                    file: "input.js",
                    line: 8,
                    column: 13
                },
                method: "AnotherImport",
                fn: ()=>AnotherImport({
                        test: true
                    })
            })
        })
});
_effector$factory({
    sid: "yv2kbtk",
    loc: {
        file: "input.js",
        line: 11,
        column: 0
    },
    method: "Randomizing",
    fn: ()=>Randomizing({
            arcade
        })
});
