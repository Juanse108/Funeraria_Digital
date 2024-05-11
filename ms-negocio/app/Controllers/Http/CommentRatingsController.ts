import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CommentRating from 'App/Models/CommentRating';

export default class CommentRatingsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return CommentRating.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await CommentRating.query().paginate(page, perPage);
      } else {
        return await CommentRating.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const commentRating: CommentRating = await CommentRating.create(body);
    return commentRating;
  }

  public async update({ params, request }: HttpContextContract) {
    const commentRating: CommentRating = await CommentRating.findOrFail(params.id);
    const body = request.body();
    commentRating.service_execution_id = body.service_execution_id;
    commentRating.rating = body.rating;
    commentRating.comment = body.comment;
    commentRating.date = body.date;
    return commentRating.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const commentRating: CommentRating = await CommentRating.findOrFail(params.id);
    response.status(204);
    return commentRating.delete();
  }

}
