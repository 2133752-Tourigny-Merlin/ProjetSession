import { NextFunction, Request, Response, Router } from 'express';

import Paths from '../constants/Paths';
import VeloRoutes from './VeloRoutes';
import Velo from '../models/Velo';
import HttpStatusCodes from '../constants/HttpStatusCodes';

// **** Variables **** //

const apiRouter = Router();

// ** Validation d'une Facture ** //
function veloValide(req: Request, res: Response, next: NextFunction) {
  const nouveauVelo = new Velo(req.body.Velo);
  const error = nouveauVelo.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// ** Ajoute Router ** //

const VeloRouter = Router();
const statsRouter = Router();

//** Velo **/

//Lire tout les velos
VeloRouter.get(Paths.Velo.GetAll, VeloRoutes.getAll);

//Lire un seul velo
VeloRouter.get(Paths.Velo.GetOne, VeloRoutes.getOne);

//Lire la liste des velos qui sont de la grandeur passé en paramètre
VeloRouter.get(Paths.Velo.GetGrandeur, VeloRoutes.getGrandeur);

//Lire la liste des velos qui sont du type passé en paramètre
VeloRouter.get(Paths.Velo.GetType, VeloRoutes.getType);

//Ajoute un velo
VeloRouter.post(Paths.Velo.Add, veloValide, VeloRoutes.add);

//Mettre à jour un velo
VeloRouter.put(Paths.Velo.Update, veloValide, VeloRoutes.update);

//Supprime un velo
VeloRouter.delete(Paths.Velo.Delete, VeloRoutes.delete_);

//** Stats **/

//Liste des couleurs les plus populaires
statsRouter.get(Paths.Stats.CouleurPopulaires, VeloRoutes.couleurPopulaires);

//get la moyenne des prix de tout les velos
statsRouter.get(Paths.Stats.MoyennePrix, VeloRoutes.moyennePrix);

// Add JeuRouter
apiRouter.use(Paths.Velo.Base, VeloRouter);

// Add JeuRouter
apiRouter.use(Paths.Stats.Base, statsRouter);

// **** Export default **** //

export default apiRouter;
