import { withFactory as _effector$factory } from 'effector';
import { parentFactory } from "../parent";
import { siblingFactory } from "./sibling";
import { notFactory } from "./not-factory";
// --- parent ---
_effector$factory({
    sid: "42pnhsqi",
    method: "parentFactory",
    fn: ()=>parentFactory()
});
// --- sibling ---
_effector$factory({
    sid: "c4bj4aph",
    method: "siblingFactory",
    fn: ()=>siblingFactory()
});
// --- not factory ---
notFactory();
