import { Router } from "express";
import { GetLoggedInUserInfos } from "../handlers/user.js";
import { getDemandes, getDemandesUser } from "../handlers/demande.js";
import {
    checkLogs,
    loggedIn,
    isSameUser,
    hasRole,
} from "../middlewares/auth.js";

const router = Router();

router.all("*", checkLogs, loggedIn);
router
    .route("/")
    .get(hasRole(["VFO", "CFA"]), getDemandes({ statue: "pending" })); // pending
router
    .route("/preverfied")
    .get(hasRole(["CFA"]), getDemandes({ statue: "pre-verfied" })); // pre valid
router
    .route("/verfied")
    .get(hasRole(["CFA"]), getDemandes({ statue: "verfied" })); //  valid
router
    .route("/denied")
    .get(hasRole(["CFA"]), getDemandes({ statue: "denied" })); //  denied
router.route("/:id").get(hasRole(["VFO", "CFA"], true), getDemandesUser); //  user

export default router;
