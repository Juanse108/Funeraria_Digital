import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room';

export default class RoomsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Room.findOrFail(params.id);
        } else {
          
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Room.query().paginate(page, perPage);
          } else {
            return await Room.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const room: Room = await Room.create(body);
        return room;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const room: Room = await Room.findOrFail(params.id);
        const body = request.body();
        room.id_room = body.id_room;
        room.capacity = body.capacidad;
        room.chairs_number = body.chairs_number;
        return room.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const room: Room = await Room.findOrFail(params.id);
        response.status(204);
        return room.delete();
      }
}
