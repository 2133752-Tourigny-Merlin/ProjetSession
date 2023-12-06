import VeloRepo from '../repos/VeloRepo';
import { IVelo } from '../models/Velo';
import { RouteError } from '../other/classes';
import HttpStatusCodes from '../constants/HttpStatusCodes';

// **** Variables **** //

export const VELO_NOT_FOUND_ERR = 'Velo non trouvé';

// **** Functions **** //

/**
 * Lire toutes les Factures.
 */
function getAll(): Promise<IVelo[]> {
  return VeloRepo.getAll();
}

/*
* Lire le velo ayant l'id passé en paramètre
*/
function getOne(id: string): Promise<IVelo | null> {
    return VeloRepo.getOne(id);
}

/*
* Lire les velos ayant la grandeur passé en paramètre
*/
function getGrandeur(grandeur: string): Promise<IVelo[]> {
    return VeloRepo.getGrandeur(grandeur);
}

/*
* Lire les velos ayant le type passé en paramètre
*/
function getType(type: string): Promise<IVelo[]> {
    return VeloRepo.getType(type);
}

/**
 * Ajouter d'un velo.
 */
function add(velo: IVelo): Promise<IVelo> {
  return VeloRepo.add(velo);
}

/**
 * Mise à jour d'un velo.
 */
async function update(velo: IVelo): Promise<IVelo> {
  const persists = await VeloRepo.persists(velo._id!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VELO_NOT_FOUND_ERR);
  }
  return VeloRepo.update(velo);
}

/**
 * Supprimer un velo par son id.
 */
async function delete_(id: string): Promise<void> {
    const persists = await VeloRepo.persists(id);
    if (!persists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, VELO_NOT_FOUND_ERR);
    }
    // Supprimer le velo
    return VeloRepo.delete_(id);
  }

/*
* Lire les couleurs populaires
*/
async function couleurPopulaires(): Promise<String[]> {
    return await VeloRepo.couleurPopulaires();
}

/*
* Lire la moyenne de prix de tout les velos
*/
async function moyennePrix(): Promise<Number> {
    return await VeloRepo.moyennePrix();
}




// **** Export default **** //

export default {
  getAll,
  getOne,
  getGrandeur,
  getType,
  add,
  update,
  delete_,
  couleurPopulaires,
  moyennePrix
} as const;
