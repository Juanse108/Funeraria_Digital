import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.alphaNum(),
      rules.required(),
      rules.minLength(24),
      rules.maxLength(24)
    ]),
    status: schema.enum(['activo', 'inactivo'] as const, [
      rules.required(),
    ]),
    registration_date: schema.string()
  })

  public messages: CustomMessages = {
    }
}
