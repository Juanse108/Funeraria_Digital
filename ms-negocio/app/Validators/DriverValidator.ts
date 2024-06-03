import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([
      rules.alphaNum(),
      rules.required(),
      rules.minLength(24),
      rules.maxLength(24),
      rules.unique({
        table: 'drivers',
        column: 'user_id',
        caseInsensitive: true
      })
    ]),
    license: schema.string([
      rules.required(),
      rules.maxLength(15)
    ]),
    disponibility: schema.enum(['disponible', 'no disponible'] as const, [
        rules.required(),
      ]),
    years_experience: schema.number([
        rules.required(),
        rules.range(2,50)
      ]),
    assigned_vehicle: schema.string([
        rules.required(),
        rules.maxLength(40)
      ]),

  })

  public messages: CustomMessages = {
            
        'user_id.required': 'El campo user_id es obligatorio.',
        'user_id.alphaNum': 'El campo user_id solo puede contener caracteres alfanuméricos.',
        'user_id.minLength': 'El campo user_id debe tener exactamente 24 caracteres.',
        'user_id.maxLength': 'El campo user_id debe tener exactamente 24 caracteres.',
        'user_id.unique': 'El campo user_id ya está en uso.',
        'license.required': 'El campo license es obligatorio',
        'license.maxLenght': 'El campo tiene un máximo de 15 caracteres',
        'disponibility.required':'El campo disponibility es obligatorio',
        'years_experience.required':'El campo years_experience es obligatorio',
        'years_experience.range': 'El campo years_experience debe estar entre 2 y 50',
        'assigned_vehicle.required':'El campo assigned_vehicle es obligatorio',
        'assigned_vehicle.maxLenght': 'El campo assigned_vehicle tiene un máximo de 40 caracteres'
    }
}
