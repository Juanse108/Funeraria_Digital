import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/sites', 'SitesController.find');
  Route.get('/sites/:id', 'SitesController.find');
  Route.post('/sites', 'SitesController.create');
  Route.put('/sites/:id', 'SitesController.update');
  Route.delete('/sites/:id', 'SitesController.delete');
})