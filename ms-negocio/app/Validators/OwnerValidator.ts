import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_owner: schema.string([
      rules.required(),
    ]),
    id_customer: schema.string([
      rules.alphaNum(),
      rules.required(),
      rules.minLength(24),
      rules.maxLength(24),
      rules.unique({
        table: 'customers',
        column: 'user_id',
        caseInsensitive: true
      }),
      rules.unique({
        table: 'administrators',
        column: 'user_id',
        caseInsensitive: true
      }),
      rules.unique({
        table: 'drivers',
        column: 'user_id',
        caseInsensitive: true
      })
    ]),
    active: schema.enum(['disponible', 'no disponible'] as const, [
      rules.required(),
    ])
  })

  public messages: CustomMessages = {
        'id_owner.required':'El campo id_owner es obligatorio',
        'id_customer.required':'El campo id_customer es obligatorio',
        'active.required':'El campo active es obligatorio'
    }
}
