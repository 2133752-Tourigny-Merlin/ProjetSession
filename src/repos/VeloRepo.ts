import Velo, { IVelo } from '../models/Velo';

// **** Functions **** //

/**
 * Vérifie si le velo existe.
 */
async function persists(id: string): Promise<boolean> {
  const velos = Velo.findById(id);

  return velos !== null;
}

/**
 * Lire tout les velos.
 */
async function getAll(): Promise<IVelo[]> {
  const velos = await Velo.find();
  return velos;
}

/**
 * Lire un velo.
 */
async function getOne(id: string): Promise<IVelo | null> {
    const velo = await Velo.findById(id);
    console.log(velo);
    return velo;
}

/**
 * Lire tout les velos ayant la grandeur passé en paramètre.
 */
async function getGrandeur(taille: string): Promise<IVelo[]> {
    const velo = await Velo.find({taille: taille});
    return velo;
}

/**
 * Lire tout les velos ayant le type passé en paramètre
 */
async function getType(type: string): Promise<IVelo[]> {
    const velo = await Velo.find({type: type});
    return velo;
}


/**
 * Ajoute un velo.
 */
async function add(velo: IVelo): Promise<IVelo> {
  const nouveauVelo= new Velo(velo);
  await nouveauVelo.save();
  return nouveauVelo;
}

/**
 * Mets à jour un velo.
 */
async function update(velo: IVelo): Promise<IVelo> {
  const veloAModifier = await Velo.findByIdAndUpdate(velo._id, velo);
  if (veloAModifier === null) {
    throw new Error('velo non trouvé');
  }

  return veloAModifier;
}

/**
 * Supprimer un velo.
 */
async function delete_(id: string): Promise<void> {
    await Velo.findByIdAndDelete(id);
  }

/**
 * Lire les couleurs de velo les plus.
 */
async function couleurPopulaires(): Promise<String[]> {
    const velo = await Velo.aggregate([
      {
          $unwind: "$couleurs"
      },
      {
          $group: {
              _id: "$couleurs",
              count: { $sum: 1 }
          }
      },
      {
          $sort: { count: -1 }
      },
      {
          $limit: 1
      },
      {
          $project: {
              _id: 0,
              couleur: "$_id",
              count: 1
          }
      }
  ]);

  const colorsArray: string[] = velo.map(item => item.couleur);

  return colorsArray;
}

/**
 * Lire la moyenne de prix de tout les velos.
 */
async function moyennePrix(): Promise<Number> {
    const moyenne = await Velo.aggregate([{
      $group: {
        _id: null,
        moyennePrix: { $avg: '$prix' }
      }
    }])
     // Check if moyenne array is not empty and return the moyennePrix value
     if (moyenne.length > 0) {
      return Number(moyenne[0].moyennePrix);
  } else {
      // Handle the case where no results are found, for example, by throwing an error
      throw new Error('Aucun velo exist');
    }
}


// **** Export default **** //

export default {
    persists,
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
