import { withFactory as _effector$factory } from 'effector';
import { parentFactory } from "../parent";
import { siblingFactory } from "./sibling";
import { notFactory } from "./not-factory";
// --- parent ---
_effector$factory({
    sid: "90xnk0zi",
    method: "parentFactory",
    fn: ()=>parentFactory()
});
// --- sibling ---
_effector$factory({
    sid: "3k1f5zk5",
    method: "siblingFactory",
    fn: ()=>siblingFactory()
});
// --- not factory ---
notFactory();
