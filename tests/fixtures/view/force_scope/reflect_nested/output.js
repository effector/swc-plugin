import { reflect } from "@effector/reflect";
const Reflected = reflect({
    view: reflect({
        view: Input,
        bind: {
            inner: $name
        },
        useUnitConfig: {
            forceScope: true
        }
    }),
    bind: {
        outer: $name
    },
    useUnitConfig: {
        forceScope: false
    }
});
