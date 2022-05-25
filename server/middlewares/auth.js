import jwt from "jsonwebtoken";
import User from "../models/user.js";
const loggedIn = async (req, res, next) => {
  if (req.user) return next();
  next({ name: "Cannot login", message: "Not signed in" });
};
const checkLogs = async (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;
  if (token) {
    const decoded = jwt.verify(token, process.env.BACK_SECRET);
    // @ts-ignore
    req.user = await User.findById(decoded.id)
      .select("-password")
      .catch((e) => {
        res.cookie("token", "", {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          expires: new Date(1),
        });
        return null;
      });
  }
  next();
};
const isSameUser = async (req, res, next) => {
  if (req.user === req.params.id) return next();
  next({
    name: "Not allowed",
    message: "You can't edit someone else's profile",
  });
};
const hasRole =
  (roles, same = false) =>
  async (req, res, next) => {
    if (same && req.user === req.params.id) return next();
    if (roles.includes(req.user.role)) return next();
    next({
      name: "Not allowed",
      message: "You don't have the privilege to do this action",
    });
  };
export { loggedIn, isSameUser, hasRole, checkLogs };
