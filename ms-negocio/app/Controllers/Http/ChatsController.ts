import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theChat = await Chat.findOrFail(params.id);
          await theChat.load("messages")
          return theChat
        } else {
          
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Chat.query().paginate(page, perPage);
          } else {
            return await Chat.query().preload("messages")
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(ChatValidator)
        const chat: Chat = await Chat.create(body)
        return chat;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const chat: Chat = await Chat.findOrFail(params.id);
        const body = request.body();
        chat.content = body.content;
        chat.chat_status = body.chat_status;
        return chat.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const chat: Chat = await Chat.findOrFail(params.id);
        response.status(204);
        return chat.delete();
      }
}
