import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CameraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ancho:schema.number([rules.range(0,100)]),
    alto:schema.number([rules.range(0,100)])
  })

  public messages: CustomMessages = {}
}
