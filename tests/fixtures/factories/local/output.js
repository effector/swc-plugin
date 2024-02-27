import { withFactory as _effector$factory } from 'effector';
import { parentFactory } from "../parent";
import { siblingFactory } from "./sibling";
import { notFactory } from "./not-factory";
// --- parent ---
_effector$factory({
    sid: "2l9yy1pl",
    method: "parentFactory",
    fn: ()=>parentFactory()
});
// --- sibling ---
_effector$factory({
    sid: "3x1lpxcy",
    method: "siblingFactory",
    fn: ()=>siblingFactory()
});
// --- not factory ---
notFactory();
