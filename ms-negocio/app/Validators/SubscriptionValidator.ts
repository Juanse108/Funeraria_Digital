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
    'id_plan.range': 'El campo id_plan debe estar entre 1 y 100.',
    'id_plan.exists': 'El campo id_plan debe existir en la tabla plans.',
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'start_date.format': 'El campo start_date debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'end_date.format': 'El campo end_date debe tener el formato yyyy-MM-dd HH:mm:ss.'
  }
}
