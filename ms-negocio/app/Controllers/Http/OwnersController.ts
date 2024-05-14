import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner'

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Owner.findOrFail(params.id);
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Owner.query().paginate(page, perPage);
          } else {
            return await Owner.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const owner: Owner = await Owner.create(body);
        return owner;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const owner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        owner.active = body.active;        
        return owner.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const owner: Owner = await Owner.findOrFail(params.id);
        response.status(204);
        return owner.delete();
      }
    
}
