import { withFactory as _effector$factory } from 'effector';
import { reflect } from "@effector/reflect";
const Reflected = _effector$factory({
    sid: "dm21p9d0",
    name: "Reflected",
    method: "reflect",
    fn: ()=>reflect({
            view: _effector$factory({
                sid: "atcsv5is",
                name: "view",
                method: "reflect",
                fn: ()=>reflect({
                        view: Input,
                        bind: {
                            inner: $name
                        },
                        useUnitConfig: {
                            forceScope: true
                        }
                    })
            }),
            bind: {
                outer: $name
            },
            useUnitConfig: {
                forceScope: false
            }
        })
});
