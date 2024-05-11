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
    serviceExecution.service_code = body.service_code;
    serviceExecution.customer_id = body.customer_id;
    serviceExecution.service_id = body.service_id;
    serviceExecution.start_date = body.start_date;
    serviceExecution.end_date = body.end_date;
    return serviceExecution.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const serviceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id);
    response.status(204);
    return serviceExecution.delete();
  } 
}
