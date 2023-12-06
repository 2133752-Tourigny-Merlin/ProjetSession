import HttpStatusCodes from '../constants/HttpStatusCodes';

import VeloService from '../services/VeloService';
import { IVelo } from '../models/Velo';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get tout les velo.
 */
async function getAll(_: IReq, res: IRes) {
  const Velo = await VeloService.getAll();
  return res.status(HttpStatusCodes.OK).json({ Velo });
}

/**
 * Get une facture selon son id
 */
async function getOne(req: IReq, res: IRes) {
    const id = req.params.id;
    const Velo = await VeloService.getOne(id);
    return res.status(HttpStatusCodes.OK).json({ Velo });
}

/**
 * Get les factures ayant un service.
 */
async function getGrandeur(req: IReq, res: IRes) {
    const grandeur = req.params.grandeur;
    const Velo = await VeloService.getGrandeur(grandeur);
    return res.status(HttpStatusCodes.OK).json({ Velo });
}

/**
 * Get la moyenne de prix de toutes les factures.
 */
async function getType(req: IReq, res: IRes) {
    const Type = req.params.type;
    const Velo = await VeloService.getType(Type);
    return res.status(HttpStatusCodes.OK).json({ Velo });
}

/**
 * Add un velo.
 */
async function add(req: IReq<{Velo: IVelo}>, res: IRes) {
  const { Velo } = req.body;
  await VeloService.add(Velo);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update un velo.
 */
async function update(req: IReq<{Velo: IVelo}>, res: IRes) {
  const { Velo } = req.body;
  await VeloService.update(Velo);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete un velo.
 */
async function delete_(req: IReq, res: IRes) {
    const id = req.params.id;
    await VeloService.delete_(id);
    return res.status(HttpStatusCodes.OK).end();
  }
  


/**
 * Get un liste des couleurs les plus populaires.
 */
async function couleurPopulaires(req: IReq, res: IRes) {
    const Velo = await VeloService.couleurPopulaires();
    return res.status(HttpStatusCodes.OK).json({ Velo });
}

/**
 * Get la moyenne de prix de tout les velos.
 */
async function moyennePrix(req: IReq, res: IRes) {
    const moyenne = await VeloService.moyennePrix();
    return res.status(HttpStatusCodes.OK).json({"Moyenne de prix": String(moyenne)+"$" });
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
