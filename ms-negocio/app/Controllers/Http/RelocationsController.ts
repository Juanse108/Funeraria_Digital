import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Relocation from 'App/Models/Relocation';
import RelocationValidator from 'App/Validators/RelocationValidator';

export default class RelocationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Relocation.findOrFail(params.id);
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Relocation.query().paginate(page, perPage);
          } else {
            return await Relocation.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(RelocationValidator)
        const relocation: Relocation = await Relocation.create(body);
        return relocation;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const relocation: Relocation = await Relocation.findOrFail(params.id);
        const body = request.body();
        relocation.departure_date = body.departure_date;
        relocation.finish_date = body.finish_date;
        relocation.origin = body.origin;
        relocation.destiny = body.destiny;
        return relocation.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const relocation: Relocation = await Relocation.findOrFail(params.id);
        response.status(204);
        return relocation.delete();
      }
    
}
