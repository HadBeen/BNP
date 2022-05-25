import { Router } from "express";
import { GetLoggedInUserInfos } from "../handlers/user.js";
import {
  createDemande,
  getDemandes,
  getDemandesUser,
  preValiderDemande,
  refuserDemande,
  validerDemande,
} from "../handlers/demande.js";
import {
  checkLogs,
  loggedIn,
  isSameUser,
  hasRole,
} from "../middlewares/auth.js";
import { isPending, isPreValide } from "../middlewares/demane.js";

const router = Router();
// added
router.route("/RemplireNouvelleDemande").post(createDemande);
router
  .route("/preValiderDemandes")
  .post(isPending, hasRole(["VFO"]), preValiderDemande);
router
  .route("/validerDemandes")
  .post(isPreValide, hasRole(["CFA"]), validerDemande);
router.route("/refuserDemandes").post(hasRole(["VFO", "CFA"]), refuserDemande); //add la condition isPending or isPrevalide
//fin added

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
