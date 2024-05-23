import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  static schema: any
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    direction: schema.string([rules.required(), rules.maxLength(50)]),
    city: schema.string([rules.required()]),
    phone: schema.number([rules.required() , rules.range(3000000000, 3999999999)]),
    rooms_number: schema.number([rules.required(), rules.range(1, 12)]),
    office_hour: schema.string({}, [
      rules.regex(/^\d{2}:\d{2}$/) // Asegura que siga el formato HH:mm
    ]),
  })
  public messages: CustomMessages = {}
}
