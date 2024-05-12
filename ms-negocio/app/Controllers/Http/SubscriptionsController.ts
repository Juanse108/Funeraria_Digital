import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription';

export default class SubscriptionController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Subscription.findOrFail(params.id);
    } else {

      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Subscription.query().paginate(page, perPage);
      } else {
        return await Subscription.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const subscription: Subscription = await Subscription.create(body);
    return subscription;
  }

  public async update({ params, request }: HttpContextContract) {
    const subscription: Subscription = await Subscription.findOrFail(params.id);
    const body = request.body();
    subscription.start_date = body.start_date;
    subscription.end_date = body.end_date;
    return subscription.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const subscription: Subscription = await Subscription.findOrFail(params.id);
    response.status(204);
    return subscription.delete();
  }
}
