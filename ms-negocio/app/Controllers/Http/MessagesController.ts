import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';

export default class MessagesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Message.findOrFail(params.id);
    } else {

      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Message.query().paginate(page, perPage);
      } else {
        return await Message.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const message: Message = await Message.create(body);
    return message;
  }

  public async update({ params, request }: HttpContextContract) {
    const message: Message = await Message.findOrFail(params.id);
    const body = request.body();
    message.content = body.content;
    message.date_shipment = body.date_shipment;
    message.read = body.read;
    return message.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const message: Message = await Message.findOrFail(params.id);
    response.status(204);
    return message.delete();
  }
}
