import { withFactory as _effector$factory } from 'effector';
import { itIsALongName, Randomizing } from "c/d";
import Defaulting, { AnotherImport } from "@/f";
const longer = _effector$factory({
    sid: "cun5gvhd",
    name: "longer",
    method: "itIsALongName",
    fn: ()=>itIsALongName(0)
});
const arcade = _effector$factory({
    sid: "1i2bj82v",
    name: "arcade",
    method: "Defaulting",
    fn: ()=>Defaulting({
            source: longer,
            condition: _effector$factory({
                sid: "9lor118s",
                name: "condition",
                method: "AnotherImport",
                fn: ()=>AnotherImport({
                        test: true
                    })
            })
        })
});
_effector$factory({
    sid: "cthm6l8z",
    method: "Randomizing",
    fn: ()=>Randomizing({
            arcade
        })
});
