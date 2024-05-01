import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';

export default class ConductoresController {
    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Conductor.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Conductor.query().paginate(page, perPage);
      } else {
        return await Conductor.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const conductor: Conductor = await Conductor.create(body);
    return conductor

    
    }
    public async update({ params, request }: HttpContextContract) {
        const conductor: Conductor = await Conductor.findOrFail(params.id);
        const body = request.body();
        conductor.id_conductor = body.id_conductor;
        conductor.nombre = body.nombre;
        conductor.apellido = body.apellido;
        conductor.ced_ciudadania = body.ced_ciudadania;
        conductor.edad = body.edad;
        conductor.licencia = body.licencia;
        conductor.disponibilidad = body.disponibilidad;
        conductor.años_experiencia = body.años_experiencia;
        conductor.telefono = body.telefono;
        conductor.correo_electronico = body.correo_electronico;
        

        return conductor.save();
      }

  public async delete({ params, response }: HttpContextContract) {
    const conductor: Conductor = await Conductor.findOrFail(params.id);
    response.status(204);
    return conductor.delete();
     }

}