import { sample, restore, createStore, createEvent } from "effector";
function createTarget(source) {
    return restore(source(), 0, {
        sid: "wph2xgt"
    });
}
sample({
    and: [
        {
            clock: createEvent({
                sid: "7cy39r3i",
                name: "clock"
            }),
            filter: createStore(true, {
                sid: "8jdri4im",
                name: "filter"
            }),
            target: createTarget(()=>createEvent({
                    sid: "4vx03vyz",
                    name: "target"
                }))
        }
    ],
    or: {
        sid: "dttebqdp"
    }
});
