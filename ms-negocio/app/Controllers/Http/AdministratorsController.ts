import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';

export default class AdministratorsController {
    
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Administrator.findOrFail(params.id);
        } else {
          
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Administrator.query().paginate(page, perPage);
          } else {
            return await Administrator.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const administrator: Administrator = await Administrator.create(body);
        return administrator;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const administrator: Administrator = await Administrator.findOrFail(params.id);
        const body = request.body();
        administrator.registration_date = body.registration_date
        administrator.status = body.status;
        return administrator.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const administrator: Administrator = await Administrator.findOrFail(params.id);
        response.status(204);
        return administrator.delete();
      }


}
