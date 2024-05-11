import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/comment_ratings', 'CommentRatingsController.find');
  Route.get('/comment_ratings/:id', 'CommentRatingsController.find');
  Route.post('/comment_ratings', 'CommentRatingsController.create');
  Route.put('/comment_ratings/:id', 'CommentRatingsController.update');
  Route.delete('/comment_ratings/:id', 'CommentRatingsController.delete');
})

