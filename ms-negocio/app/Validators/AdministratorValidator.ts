import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.alphaNum(),
      rules.required(),
      rules.minLength(24),
      rules.maxLength(24),
      rules.unique({
        table: 'administrators',
        column: 'user_id',
        caseInsensitive: true
      })
    ]),
    registration_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'})
  })

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio.',
    'user_id.alphaNum': 'El campo user_id solo puede contener caracteres alfanuméricos.',
    'user_id.minLength': 'El campo user_id debe tener exactamente 24 caracteres.',
    'user_id.maxLength': 'El campo user_id debe tener exactamente 24 caracteres.',
    'user_id.unique': 'El campo user_id ya está en uso.',
    'registration_date.required': 'El campo registration_date es obligatorio.',
    'registration_date.date': 'El campo registration_date debe ser una fecha válida en formato yyyy-MM-dd.'
    }
}
