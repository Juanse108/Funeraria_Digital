import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution';

export default class ServiceExecutionsController {
  public async find({ request, params }: HttpContextContract) {
      if (params.id) {
        let  theServiceExecution:ServiceExecution = await  ServiceExecution.findOrFail(params.id);
        await theServiceExecution.load("comentarioCalifcacion")
        await theServiceExecution.load("chat")
        return theServiceExecution
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await ServiceExecution.query().paginate(page, perPage);
        } else {
          return await ServiceExecution.query()
        }
      }
    }
  
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const serviceExecution: ServiceExecution = await ServiceExecution.create(body);
    return serviceExecution;
  }

  public async update({ params, request }: HttpContextContract) {
    const serviceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id);
    const body = request.body();
    serviceExecution.codigo_servicio = body.codigo_servicio;
    serviceExecution.id_customer = body.nombres;
    serviceExecution.id_servicio = body.apellidos;
    serviceExecution.fecha_inicio = body.correo_electronico;
    serviceExecution.fecha_fin = body.direccion;
    return serviceExecution.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const serviceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id);
    response.status(204);
    return serviceExecution.delete();
  } 
}
