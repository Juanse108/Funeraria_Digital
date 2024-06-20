import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';
import PlanValidator from 'App/Validators/PlanValidator';

export default class PlansController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePlan = await Plan.findOrFail(params.id);
      await thePlan.load("subscriptions")
      return thePlan
    } else {
      let plans: Plan[] = await Plan.query().preload("subscriptions", subscription => {
        subscription.preload("payments")
      })
      return plans
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(PlanValidator)
    const plan: Plan = await Plan.create(body);
    return plan;
  }

  public async update({ params, request }: HttpContextContract) {
    const plan: Plan = await Plan.findOrFail(params.id);
    const body = request.body();
    plan.name = body.name;
    plan.description = body.description;
    plan.price = body.price;
    plan.number_beneficiaries = body.number_beneficiaries;
    return plan.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const plan: Plan = await Plan.findOrFail(params.id);
    response.status(204);
    return plan.delete();
  }
}
