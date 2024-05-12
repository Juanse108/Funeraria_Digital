import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';

export default class PaymentsController {

  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Payment.findOrFail(params.id);
    } else {

      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Payment.query().paginate(page, perPage);
      } else {
        return await Payment.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const payment: Payment = await Payment.create(body);
    return payment;
  }

  public async update({ params, request }: HttpContextContract) {
    const payment: Payment = await Payment.findOrFail(params.id);
    const body = request.body();
    payment.payment_date = body.payment_date;
    payment.quantity = body.quantity;
    payment.payment_type = body.payment_type;
    payment.discount = body.discount;
    return payment.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const payment: Payment = await Payment.findOrFail(params.id);
    response.status(204);
    return payment.delete();
  }

}
