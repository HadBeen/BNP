//Demande(statu,type,debit,frais,date,,nat_pay)
import mongoose from "mongoose";

const demandeSchema = new mongoose.Schema({
   
    monnaie: {
        required: true,
        type: String,
    },

    m_lettre: {
        type: String,
        required: true,
    },

    m_chiffre: {
        required: true,
        type: Number,
        min: 0,
    },

    ref_paiement: {
        required: true,
        type: String,
    },

    debit: {
        type: Number,
        min: 1,
        max: 2,
    },

    virement_par: {
        type: Number,
        min: 1,
        max: 3,
    },

    frais: {
        type: Number,
        min: 1,
        max: 3,
    },

    date_de_valeur: {
        type: Date,
        required: true,
    },
    
    num_transaction: {
        date: {
            type: Date,
        },
        siege: {
            type: String,
            minlength: 5,
            maxlength: 5,
        },
        racin: {
            type: String,
            minlength: 6,
            maxlength: 6,
        },
        ordinal: {
            type: String,
            minlength: 3,
            maxlength: 3,
        },
        cle: {
            type: String,
            minlength: 2,
            maxlength: 2,
        },
        devise: {
            type: String,
            minlength: 3,
            maxlength: 3,
        },
    },

    nature_de_paiement: {
        type: String,
        required: true,
    },

    num_dom: {
        required: true,
        type: String,
        unique: true,
    },

    benificier: {
        nom: {
            type: String,
            required: true,
        },

        prenom: {
            type: String,
            required: true,
        },
        
        num_cmpt: {
            type: String,
            required: true,
        },
        
        address_cmplt: {
            type: String,
            required: true,
        },
        
        nom_banque: {
            required: true,
            type: String,
        },
        
        adr_swift: {
            required: true,
            type: String,
        },
    },

    expatrier: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    statue: {
        type: String,
        enum: ["verified", "pre-verfied", "denied", "pending"],
        default: "pending",
    },

    capture_blocage: { type: String },
    piece_jointe: {
        contrat: {
            required: true,
            type: String,
        },
        fiche_de_paie_2: {
            required: true,
            type: String,
        },
        fiche_de_paie_1: {
            required: true,
            type: String,
        },
        accord_operation_remarquable: {
            required: true,
            type: String,
        },

        attestation_de_situation_fiscale: {
            required: true,
            type: String,
        },
        contact_de_travail: {
            required: true,
            type: String,
        },
        permis_de_travail: {
            required: true,
            type: String,
        },
        ecrit_explicatif: {
            type: String,
        },
    },
});

const demande = mongoose.model("Demande", demandeSchema);
export default demande;
