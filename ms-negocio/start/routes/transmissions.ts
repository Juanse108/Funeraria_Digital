import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/transmissions', 'TransmissionsController.find');
  Route.get('/transmissions/:id', 'TransmissionsController.find');
  Route.post('/transmissions', 'TransmissionsController.create');
  Route.put('/transmissions/:id', 'TransmissionsController.update');
  Route.delete('/transmissions/:id', 'TransmissionsController.delete');
})
