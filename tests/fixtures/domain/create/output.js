import { createDomain } from "effector";
// --- valid: empty ---
const domain = createDomain({
    sid: "8i2p4q1",
    name: "domain",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
// --- valid: named ---
const domainWithName = createDomain("name", {
    sid: "9gxo8egy",
    name: "domainWithName",
    loc: {
        file: "input.js",
        line: 5,
        column: 23
    }
});
// --- valid: config ---
const domainWithConfig = createDomain({
    name: "name"
}, {
    sid: "czh7d68f",
    name: "domainWithConfig",
    loc: {
        file: "input.js",
        line: 7,
        column: 25
    }
});
// --- valid: name + confug ---
const domainComplete = createDomain("name", {
    sid: "892r6ein",
    name: "domainComplete",
    loc: {
        file: "input.js",
        line: 9,
        column: 23
    },
    and: {
        domain
    }
});
