import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'customers', column: 'id_customer'})]),
    deceased_location: schema.string([rules.required(), rules.minLength(4),rules.maxLength(20)]),
    id_service: schema.number([rules.required(), rules.exists({table: 'services', column: 'id_service'})]),
    start_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    end_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'})
   
  })

  public messages: CustomMessages = {
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'customer_id.range': 'El campo customer_id debe estar entre 1 y 100.',
    'customer_id.exists': 'El campo customer_id debe existir en la tabla customers.',
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_service.exists': 'El campo id_service debe existir en la tabla services.',
    'start_date.format': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.format': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.',
  }
}
