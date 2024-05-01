import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Traslado from 'App/Models/Traslado';

export default class TrasladosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Traslado.findOrFail(params.id);
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Traslado.query().paginate(page, perPage);
          } else {
            return await Traslado.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const traslado: Traslado = await Traslado.create(body);
        return traslado;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const traslado: Traslado = await Traslado.findOrFail(params.id);
        const body = request.body();
        traslado.id_traslado = body.id_traslado;
        traslado.fecha_hora_salida = body.fecha_hora_salida;
        traslado.fecha_hora_fin = body.fecha_hora_fin;
        traslado.origen = body.origen;
        traslado.destino = body.destino;
        traslado.distancia = body.distancia;
        traslado.costo = traslado.costo;

        return traslado.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const traslado: Traslado = await Traslado.findOrFail(params.id);
        response.status(204);
        return traslado.delete();
      }
    
}
