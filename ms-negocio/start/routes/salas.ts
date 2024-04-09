import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/salas', 'SalasController.find');
  Route.get('/salas/:id', 'SalasController.find');
  Route.post('/salas', 'SalasController.create');
  Route.put('/salas/:id', 'SalasController.update');
  Route.delete('/salas/:id', 'SalasController.delete');
})
