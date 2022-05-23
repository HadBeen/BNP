import demande from '../models/demande.js';

export const getDemandesUser = async (req, res,next) => {
  try {
    const { id } = req.params;
    const demandes = await demande.find({expatrie:id}).populate("expatrie");
    res.status(200).json(demandes);
  } catch (error) {
    next(error);
  }
};

export const getDemandes = (find) => (async (req, res,next) => {
    try {
      const demandes = await demande.find(find).populate("expatrie");
      res.status(200).json(demandes);
    } catch (error) {
      next(error);
    }
  });
export const getDemande = async (req, res,next) => {
  const { id } = req.params;
  try {
    const dmnd = await demande.findById(id);
    res.status(200).json(dmnd);
  } catch (error) {
    next(error);
  }
};

export const createDemande = async (req, res,next) => {
  const {
    // to put
  } = req.body;

  const newdemande = new demande({
    // to put
});

  try {
    await newdemande.save();

    res.status(201).json(newdemande);
  } catch (error) {
next(error)
  }
};