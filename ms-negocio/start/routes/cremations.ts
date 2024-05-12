import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/cremation', 'CremationsController.find');
    Route.get('/cremation/:id', 'CremationsController.find');
    Route.post('/cremation', 'CremationsController.create');
    Route.put('/cremation/:id', 'CremationsController.update');
    Route.delete('/cremation/:id', 'CremationsController.delete');
})