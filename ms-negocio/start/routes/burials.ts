import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/burial', 'BurialsController.find');
    Route.get('/burial/:id', 'BurialsController.find');
    Route.post('/burial', 'BurialsController.create');
    Route.put('/burial/:id', 'BurialsController.update');
    Route.delete('/burial/:id', 'BurialsController.delete');
})