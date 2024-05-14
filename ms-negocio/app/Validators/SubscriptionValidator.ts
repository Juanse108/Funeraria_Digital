import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_plan: schema.number([rules.required(), rules.range(1,100)]),
    customer_id: schema.number([rules.required(), rules.range(1,100)]),
    start_date: schema.string([rules.required()]),
    end_date: schema.string([rules.required()])
  })

  public messages: CustomMessages = {
    'id_plan.required': 'El campo id_plan es obligatorio.',
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'end_date.required': 'El campo end_date es obligatorio.'
  }
}
