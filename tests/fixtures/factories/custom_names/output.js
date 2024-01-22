import { withFactory as _effector$factory } from 'effector';
import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";
const longer = _effector$factory({
    sid: "3l2l3yp1",
    name: "longer",
    method: "itIsALongName",
    fn: ()=>itIsALongName(0)
});
const arcade = _effector$factory({
    sid: "2jnnr0of",
    name: "arcade",
    method: "Defaulting",
    fn: ()=>Defaulting({
            source: longer,
            condition: _effector$factory({
                sid: "cg0cztrb",
                name: "condition",
                method: "AnotherImport",
                fn: ()=>AnotherImport({
                        test: true
                    })
            })
        })
});
_effector$factory({
    sid: "7kr29sob",
    method: "Randomizing",
    fn: ()=>Randomizing({
            arcade
        })
});
