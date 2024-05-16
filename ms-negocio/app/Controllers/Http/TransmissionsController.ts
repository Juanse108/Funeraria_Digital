import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transmission from 'App/Models/Transmission';
import TranssmissionValidator from 'App/Validators/TranssmissionValidator';

export default class TransmissionsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Transmission.findOrFail(params.id);
        } else {
    
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Transmission.query().paginate(page, perPage);
          } else {
            return await Transmission.query()
          }
        }
      }


    public async create({ request }: HttpContextContract) {
        const body = await request.validate(TranssmissionValidator)
        const transmission: Transmission = await Transmission.create(body);
        return transmission;
      }
}
