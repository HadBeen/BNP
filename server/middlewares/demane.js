// import demande from "../models/demande.js";

const isPreValide = async (req, res, next) => {
  if ((req.demande.statue = "pre-verfied" && req.demande === req.params.id))
    return next();
  next({
    message: "demande nest pas prevalidee",
  });
};
const isValide = async (req, res, next) => {
  if ((req.demande.statue = "verfied" && req.demande === req.params.id))
    return next();
  next({
    message: "demande n'est pas validee ",
  });
}; //to be used in notification  ig
const isRefused = async (req, res, next) => {
  if ((req.demande.statue = "denied" && req.demande === req.params.id))
    return next();
  next({
    message: "demande n'est pas refusee ",
  });
}; //to be used in notification  ig
const isPending = async (req, res, next) => {
  if ((req.demande.statue = "pending" && req.demande === req.params.id))
    return next();
  next({
    message: "demande n'est pas en attente ",
  });
};
export { isPreValide, isValide, isRefused, isPending };
