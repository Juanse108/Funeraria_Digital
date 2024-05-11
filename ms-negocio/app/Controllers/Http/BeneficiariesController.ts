import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary';

export default class BeneficiariesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Beneficiary.findOrFail(params.id);
        } else {
          
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Beneficiary.query().paginate(page, perPage);
          } else {
            return await Beneficiary.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const beneficiary: Beneficiary = await Beneficiary.create(body);
        return beneficiary;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const beneficiary: Beneficiary = await Beneficiary.findOrFail(params.id);
        const body = request.body();
        beneficiary.id_customer = body.id_customer;
        beneficiary.id_account_holder = body.id_account_holder;
        beneficiary.relationship_account_holder = body.relationship_account_holder;
        beneficiary.start_date = body.start_date;

        return beneficiary.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const beneficiary: Beneficiary = await Beneficiary.findOrFail(params.id);
        response.status(204);
        return beneficiary.delete();
      }

}
