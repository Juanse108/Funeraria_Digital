import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/sedes', 'SedesController.find');
  Route.get('/sedes/:id', 'SedesController.find');
  Route.post('/sedes', 'SedesController.create');
  Route.put('/sedes/:id', 'SedesController.update');
  Route.delete('/sedes/:id', 'SedesController.delete');
})