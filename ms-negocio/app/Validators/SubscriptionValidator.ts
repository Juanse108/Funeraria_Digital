import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_plan: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'plans', column: 'id_plan'})]),
    customer_id: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'customers', column: 'id_customer'})]),
    start_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    end_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'})
  })

  public messages: CustomMessages = {
    'id_plan.required': 'El campo id_plan es obligatorio.',
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'end_date.required': 'El campo end_date es obligatorio.'
  }
}
