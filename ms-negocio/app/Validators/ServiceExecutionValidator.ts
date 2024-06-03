import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'customers', column: 'id_customer'})]),
    deceased_location: schema.string([rules.required(), rules.minLength(4),rules.maxLength(20)]),
    service_id: schema.number([rules.required(), rules.exists({table: 'services', column: 'id_service'})]),
    start_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    end_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'})
   
  })

  public messages: CustomMessages = {
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'service_id.required': 'El campo service_id es obligatorio.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'start_date.date': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.date': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.',
  }
}
