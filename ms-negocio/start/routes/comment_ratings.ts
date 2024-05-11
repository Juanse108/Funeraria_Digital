import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/comment_ratings', 'CommentRatingesController.find');
  Route.get('/comment_ratings/:id', 'CommentRatingesController.find');
  Route.post('/comment_ratings', 'CommentRatingesController.create');
  Route.put('/comment_ratings/:id', 'CommentRatingesController.update');
  Route.delete('/comment_ratings/:id', 'CommentRatingesController.delete');
})

