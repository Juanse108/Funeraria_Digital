import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Customer from 'App/Models/Customer';
import CustomerValidator from 'App/Validators/CustomerValidator';

export default class CustomersController {
  public async find({ params }: HttpContextContract) {
    if (params.id) {
      return Customer.findOrFail(params.id);
    }
    else {
      let auxCustomer: {}[] = [];
      let originalCustomer: Customer[] = await Customer.query().preload("owners").preload("beneficiaries");
      
      for (let i = 0; i < originalCustomer.length; i++) {
        let api_response = await axios.get(`${Env.get('MS_SECURITY')}/users/${originalCustomer[i].user_id}`);
        let data = {
          "id_customer": originalCustomer[i].id_customer,
          "user_id": originalCustomer[i].user_id,
          "name": api_response.data.name,
          "email": api_response.data.email,
          "registration_date": originalCustomer[i].registration_date,
          "status": originalCustomer[i].status, 
          "owners" : originalCustomer[i].owners,
          "beneficiaries:" : originalCustomer[i].beneficiaries
        };
        auxCustomer.push(data);
      }

      return auxCustomer
    }
  }


  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CustomerValidator)
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
