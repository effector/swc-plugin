import { sample, restore, createStore, createEvent } from "effector";
function createTarget(source) {
    return restore(source(), 0, {
        sid: "30fdkv5q"
    });
}
sample({
    and: [
        {
            clock: createEvent({
                sid: "1fn272w6",
                name: "clock"
            }),
            filter: createStore(true, {
                sid: "9rb8y377",
                name: "filter"
            }),
            target: createTarget(()=>createEvent({
                    sid: "70nfibeq",
                    name: "target"
                }))
        }
    ],
    or: {
        sid: "cuj56asv"
    }
});
