import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServicePlan from 'App/Models/ServicePlan';

export default class ServicePlansController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return ServicePlan.findOrFail(params.id);
    } else {
      
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await ServicePlan.query().paginate(page, perPage);
      } else {
        return await ServicePlan.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const servicioPlan: ServicePlan = await ServicePlan.create(body);
    return servicioPlan;
  }


  public async delete({ params, response }: HttpContextContract) {
    const servicioPlan: ServicePlan = await ServicePlan.findOrFail(params.id);
    response.status(204);
    return servicioPlan.delete();
  }
}
