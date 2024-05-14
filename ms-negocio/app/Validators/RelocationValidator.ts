import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_service: schema.number([rules.required()]),
    assigned_driver: schema.number([rules.required()]),
    departure_date: schema.string.optional(),
    finish_date: schema.string.optional(),
    origin: schema.string([rules.required(),rules.maxLength(20)]),
    destiniy:schema.string([rules.required(),rules.maxLength(20)])
  })

  public messages: CustomMessages = {

    'id_relocation.required': 'El campo id_relocation es obligatorio.',
    'origin.maxLength': 'El campo origin debe tener maximo 20 caracteres.',
    'destiny.maxLength': 'El campo destiny debe tener maximo 20 caracteres.',
    'id_service.required': 'El campo id_service es obligatorio.',
    'assigned_driver': 'El campo assigned_driver es obligatorio',
  }
}
