import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    payment_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    quantity: schema.number([rules.required(), rules.range(0, 100000)] ),
    payment_type: schema.string([
      rules.required()]),
    discount: schema.number([rules.required(), rules.range(0, 100)]),
    subscription_id: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'subscriptions', column: 'id_subscription'})]),
  })

  public messages: CustomMessages = {

    'payment_date.format': 'El campo payment_date debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'quantity.required': 'El campo quantity es obligatorio.',
    'discount.range': 'El campo discount debe estar entre 1 y 100.',
    'payment_type.required': 'El campo payment_type es obligatorio.',
    'discount.required': 'El campo discount es obligatorio.',
    'subscription_id.range': 'El campo subscription_id debe estar entre 1 y 100.',
    'subscription_id.exists': 'El campo subscription_id debe existir en la tabla subscriptions.',
    'subscription_id.required': 'El campo subscription_id es obligatorio.',
  }
}
