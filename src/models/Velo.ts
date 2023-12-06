import mongoose, { Date, Schema, model } from 'mongoose';

const tailleValeurs = ["TP", "P", "M", "L", "TL"];
const typeSuspension = ["Avant", "Arrière"];
const typeVelo = ["Route", "Montagne monté", "Montagne descente", "Ville", "Bmx"];
// **** Interface Velo ****//

interface IRoue {
    marque: string;
    grandeur: number;
    tubeless: Boolean;
    psiMax: number;
}

interface ISuspension {
    type: "Avant" | "Arrière";
    marque: string;
    psiMin: number;
    psiMax: number;
    taille: number;
}

export interface IVelo {
    marque: string;
    modele: string;
    dateDeCreation: Date;
    prix: number;
    type: "Route" | "Montagne monté" | "Montagne descente" | "Ville" | "Bmx";
    taille: "TP" | "P" | "M" | "L" | "TL";
    roues: IRoue[];
    suspensions: ISuspension[];
    fonctionnel: Boolean;
    couleurs: string[];
    nbVitesse: number;
    _id?: string;
  }
  

// **** VeloSchema **** //
const VeloSchema = new Schema<IVelo>({
    marque: { type: String, required: true, message: "La marque du velo est obligatoire."},

    modele: { type: String, required: true, message: "La modele du velo est obligatoire."},

    dateDeCreation: { type: Date, required:true, max: '2023-12-31', message: "La date de creation du velo est obligatoire."},

    prix: { type: Number, required: true, message: "Le prix du velo est obligatoire."},

    type: { 
        type: String, 
        required: true, 
        message: "La type du velo est obligatoire.",
        validate: {
            validator: function (value: string) {
                return typeVelo.includes(value);
            },
            message: "La taille du velo doit être l'une des valeurs suivantes: Route, Montagne monté, Montagne descente, Ville, Bmx",
        },
    },

    taille: { 
        type: String, 
        required: true, 
        message: "La taille du velo est obligatoire.", 
        validate: {
            validator: function (value: string) {
                return tailleValeurs.includes(value);
            },
            message: "La taille du velo doit être l'une des valeurs suivantes: TP, P, M, L, TL"
        },
    },
        
    roues: {
        type: [{
            marque: { type: String, required: true, message: "La marque de la roue est obligatoire."},
            grandeur: { type: Number, required: true, message: "La grandeur de la roue est obligatoire."},
            tubeless: { type: Boolean, required: true, message: "La roue doit être tubeless ou non."},
            psiMax: { type: Number, required: true, message: "Le psi maximum de la roue est obligatoire."},
        },],
        required: true,
        validate: {
            validator: function (roues: IRoue[]) {
              // Vérifiez que chaque genre a un nom et une URL
              return roues.every((roue) => roue.marque && roue.grandeur && roue.tubeless && roue.psiMax && roues.length == 2);
            },
            message: 'Chaque roue doit avoir une marque, une grandeur, doit etre tubeless ou non et doit avoir un psi maximum',
          },
    },

    suspensions: {
        type: [{
            type: { 
                type: String, 
                required: true, 
                message: "Le type est obligatoire.",
                validate: {
                    validator: function (valeur: string) {
                        return typeSuspension.includes(valeur);
                    },
                    message: "Le type e la suspension doit être l'une des valeurs suivantes: Avant, Arrière"
                },
            },
            marque: { type: String, required: true, message: "La marque de la suspension est obligatoire."},
            psiMin: { type: Number, required: true, message: "Le psi minimum de la suspension est obligatoire."},
            psiMax: { type: Number, required: true, message: "Le psi maximum de la suspension est obligatoire."},
            taille: { type: Number, required: true, message: "La taille de la suspension est obligatoire."},
        },],
        required: true,
        validate: {
            validator: function (suspensions: ISuspension[]) {
              // Vérifiez que chaque genre a un nom et une URL
              return suspensions.every((suspension) => suspension.type && suspension.marque && suspension.psiMin && suspension.psiMax && suspension.taille);
            },
            message: 'Chaque suspension doit avoir son type, sa marque, son psi minimum et maximum ainsi que sa taille.',
          },
          message: "La ou les suspensions sont obligatoires.",
    },

    fonctionnel: { type: Boolean, required:true, message: "Le velo doit être fonctionnel ou non-foncitonnel."},

    couleurs: { type: [String], required: true, message: "La couleur du velo est obligatoire."},

    nbVitesse: { type: Number, required: true, message: "Le nombre de vitesse est obligatoire."},
});

// **** Exportation **** //
mongoose.pluralize(null);
export default model<IVelo>('velo', VeloSchema);