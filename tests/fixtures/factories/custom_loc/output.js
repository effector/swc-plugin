import { withFactory as _effector$factory } from 'effector';
import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";
const longer = _effector$factory({
    sid: "3l2l3yp1",
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
    sid: "2jnnr0of",
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
                sid: "cg0cztrb",
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
    sid: "7kr29sob",
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
