import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number([rules.required()]),
    service_id: schema.number([rules.required()]),
    start_date: schema.string([rules.required()]),
    end_date: schema.string.optional(),
   
  })

  public messages: CustomMessages = {
    'customer_id.required': 'El campo customer_id es obligatorio.',
    'service_id.required': 'El campo service_id es obligatorio.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'start_date.date': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.date': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.',
  }
}
