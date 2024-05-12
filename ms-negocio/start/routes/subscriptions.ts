import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/subscriptions', 'SubscriptionController.find');
  Route.get('/subscriptions/:id', 'SubscriptionController.find');
  Route.post('/subscriptions', 'SubscriptionController.create');
  Route.put('/subscriptions/:id', 'SubscriptionController.update');
  Route.delete('/subscriptions/:id', 'SubscriptionController.delete');
})
