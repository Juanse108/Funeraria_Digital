import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_driver: schema.number([
      rules.required(),
    ]),
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
    license: schema.string([
      rules.required(),
      rules.maxLength(30)
    ]),
    disponibility: schema.enum(['disponible', 'no disponible'] as const, [
        rules.required(),
      ]),
    years_experience: schema.number([
        rules.required(),
        rules.maxLength(25)
      ]),
    assigned_vehicle: schema.string([
        rules.required(),
        rules.maxLength(40)
      ]),

  })

  public messages: CustomMessages = {
        'id_driver.required':'El campo id_driver es obligatorio',
        'user_id.required':'El campo user_id es obligatorio',
        'license.required': 'El campo license es obligatorio',
        'license.maxLenght': 'El campo tiene un máximo de 30 caracteres',
        'disponibility.required':'El campo disponibility es obligatorio',
        'years.required':'El campo years es obligatorio',
        'years.maxLenght': 'El campo years tiene un valor máximo de 25 caracteres',
        'assigned_vehicle.required':'El campo assigned_vehicle es obligatorio',
        'assigned_vehicle.maxLenght': 'El campo assigned_vehicle tiene un máximo de 40 caracteres'
    }
}
