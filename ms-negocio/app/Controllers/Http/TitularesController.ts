import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titular from 'App/Models/Titular'

export default class TitularesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Titular.findOrFail(params.id);
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Titular.query().paginate(page, perPage);
          } else {
            return await Titular.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const titular: Titular = await Titular.create(body);
        return titular;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const titular: Titular = await Titular.findOrFail(params.id);
        const body = request.body();
        titular.id_titular = body.id_titular;
        titular.nombre = body.nombre;
        titular.apellido = body.apellido;
        titular.ced_ciudadania = body.ced_ciudadania;
        titular.direccion = body.direccion;
        titular.telefono = body.telefono;
        return titular.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const titular: Titular = await Titular.findOrFail(params.id);
        response.status(204);
        return titular.delete();
      }
    
}
