import { Router } from "express";
import {
  editProfile,
  GetLoggedInUserInfos,
  getClients,
} from "../handlers/user.js";
import {
  checkLogs,
  loggedIn,
  isSameUser,
  hasRole,
} from "../middlewares/auth.js";

const router = Router();

router
  .route("/")
  .all(checkLogs, loggedIn)
  .get(hasRole(["VFO","CFA"]), getClients)
  .put(isSameUser, editProfile, GetLoggedInUserInfos);

export default router;
