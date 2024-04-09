import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/pagos', 'PagosController.find');
  Route.get('/pagos/:id', 'PagosController.find');
  Route.post('/pagos', 'PagosController.create');
  Route.put('/pagos/:id', 'PagosController.update');
  Route.delete('/pagos/:id', 'PagosController.delete');
})
