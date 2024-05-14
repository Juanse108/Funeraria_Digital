import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
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
    status: schema.enum(['activo', 'inactivo'] as const, [
      rules.required(),
    ]),
    registration_date: schema.string([
      rules.required(),
    ])
  })

  public messages: CustomMessages = {
    }
}
