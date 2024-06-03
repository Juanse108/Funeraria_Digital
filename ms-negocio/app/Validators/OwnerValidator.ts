import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_customer: schema.number([
      rules.required(),
      rules.range(1,100), 
      rules.exists({table: 'customers', column: 'id_customer'})
    ]),
    active: schema.enum(['disponible', 'no disponible'] as const, [
      rules.required(),
    ])
  })

  public messages: CustomMessages = {
    'id_customer.required': 'El campo id_customer es obligatorio',
    'active.required': 'El campo active es obligatorio'
  }
}
