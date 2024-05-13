import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';

export default class CustomersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCustomer: Customer = await Customer.findOrFail(params.id);
      await theCustomer.load('service_executions')
      await theCustomer.load('subscriptions')
      await theCustomer.load('owners')
      return theCustomer
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Customer.query().paginate(page, perPage);
        // const page = request.input('page', 1);
        // const perPage = request.input("per_page", 20);
        // let auxClients = []

        // let originalClients:Customer[] = await Customer.query().paginate(page, perPage);

        // for( let i =0; i < originalClients.length; i++){
        //   let data = {
        //     "id":originalClients[i].id,
        //      "fecha_registro":originalClients[i].fecha_registro,
        //      "activo":originalClients[i].activo,

        //   }
        //   auxClients.push(data)
        // }

      } else {
        return await Customer.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const customer: Customer = await Customer.create(body);
    return customer;
  }

  public async update({ params, request }: HttpContextContract) {
    const customer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();
    customer.registration_date = body.registration_date
    customer.status = body.status;
    return customer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const customer: Customer = await Customer.findOrFail(params.id);
    response.status(204);
    return customer.delete();
  }
}
