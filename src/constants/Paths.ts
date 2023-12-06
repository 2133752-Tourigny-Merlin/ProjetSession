/**
 * Express router paths go here.
 */

export default {
  Base: '/',
  Velo: {
    Base: '/velo',
    GetAll: '/', //fonctionne
    GetOne: '/:id', //fonctionne
    GetGrandeur: '/grandeur/:grandeur', //fonctionne
    GetType: '/type/:type',//fonctionne
    Add: '/',//fonctionne
    Update: '/',//fonctionne
    Delete: '/:id',//fonctionne
  },
  Stats: {
    Base: '/stats',
    CouleurPopulaires: '/couleur',
    MoyennePrix: '/prix' //fonctionne
  }
} as const;
