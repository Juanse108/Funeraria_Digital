import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/suscripciones', 'SuscripcionesController.find');
  Route.get('/suscripciones/:id', 'SuscripcionesController.find');
  Route.post('/suscripciones', 'SuscripcionesController.create');
  Route.put('/suscripciones/:id', 'SuscripcionesController.update');
  Route.delete('/suscripciones/:id', 'SuscripcionesController.delete');
})
