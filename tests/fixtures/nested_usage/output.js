import { sample, restore, createStore, createEvent } from "effector";
function createTarget(source) {
    return restore(source(), 0, {
        sid: "5p7z20bo"
    });
}
sample({
    and: [
        {
            clock: createEvent({
                sid: "5nadt32p",
                name: "clock"
            }),
            filter: createStore(true, {
                sid: "c20b0ouc",
                name: "filter"
            }),
            target: createTarget(()=>createEvent({
                    sid: "ceiu4qu6"
                }))
        }
    ],
    or: {
        sid: "dcp0gxlu"
    }
});
