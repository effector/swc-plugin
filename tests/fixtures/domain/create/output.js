import { createDomain } from "effector";
// --- valid: empty ---
const domain = createDomain({
    sid: "9i2yamjg",
    name: "domain",
    loc: {
        file: "input.js",
        line: 3,
        column: 15
    }
});
// --- valid: named ---
const domainWithName = createDomain("name", {
    sid: "6qcbq2c7",
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
    sid: "1dag6b37",
    name: "domainWithConfig",
    loc: {
        file: "input.js",
        line: 7,
        column: 25
    }
});
// --- valid: name + confug ---
const domainComplete = createDomain("name", {
    sid: "8ljxypj7",
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
