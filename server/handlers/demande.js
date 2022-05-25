import mongoose from "mongoose";
import demande from "../models/demande.js";

export const getDemandesUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const demandes = await demande.find({ expatrie: id }).populate("expatrie");
    res.status(200).json(demandes);
  } catch (error) {
    next(error);
  }
};

export const getDemandes = (find) => async (req, res, next) => {
  try {
    const demandes = await demande.find(find).populate("expatrie");
    res.status(200).json(demandes);
  } catch (error) {
    next(error);
  }
};
export const getDemande = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dmnd = await demande.findById(id);
    res.status(200).json(dmnd);
  } catch (error) {
    next(error);
  }
};

export const createDemande = async (req, res, next) => {
  const {
    monnaie,
    m_lettre,
    m_chiffre,
    ref_paiement,
    debit,
    virement_par,
    frais,
    date_de_valeur,
    num_transaction: { date, siege, racin, ordinal, cle, devise },
    nature_de_paiement,
    num_dom,
    benificier: { nom, prenom, num_cmpt, address_cmplt, nom_banque, adr_swift },
    expatrie,
    statue,
    capture_blocage,
    piece_jointe: {
      contrat,
      fiche_de_paie_2,
      fiche_de_paie_1,
      accord_operation_remarquable,
      attestation_de_situation_fiscale,
      contact_de_travail,
      permis_de_travail,
      ecrit_explicatif,
    },
  } = req.body;

  const newdemande = new demande({
    monnaie,
    m_lettre,
    m_chiffre,
    ref_paiement,
    debit,
    virement_par,
    frais,
    date_de_valeur,
    num_transaction: {
      date,
      siege,
      racin,
      ordinal,
      cle,
      devise,
    },
    nature_de_paiement,
    num_dom,
    benificier: {
      nom,
      prenom,
      num_cmpt,
      address_cmplt,
      nom_banque,
      adr_swift,
    },
    expatrie,
    statue,
    capture_blocage,
    piece_jointe: {
      contrat,
      fiche_de_paie_2,
      fiche_de_paie_1,
      accord_operation_remarquable,
      attestation_de_situation_fiscale,
      contact_de_travail,
      permis_de_travail,
      ecrit_explicatif,
    },
  });

  try {
    await newdemande.save();

    res.status(201).json(newdemande);
  } catch (error) {
    next(error);
  }
};

export const preValiderDemande = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statue } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`la demande n'existe pas: ${id}`);
    const demandePreValide = { statue: "pre-verfied", _id: id };
    await demande.findByIdAndUpdate(id, demandePreValide, { new: true });
    res.json(demandePreValide);
  } catch (error) {
    next(error);
  }
};
export const validerDemande = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statue } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`la demande n'existe pas: ${id}`);
    const demandeValide = { statue: "verfied", _id: id };
    await demande.findByIdAndUpdate(id, demandeValide, { new: true });
    res.json(demandeValide);
  } catch (error) {
    next(error);
  }
};
export const refuserDemande = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statue } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`la demande n'existe pas: ${id}`);
    const demandeRefuse = { statue: "denied", _id: id };
    await demande.findByIdAndUpdate(id, demandeRefuse, { new: true });
    res.json(demandeRefuse);
  } catch (error) {
    next(error);
  }
};
