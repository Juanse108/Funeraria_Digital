import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    destination_ashes: schema.string([rules.required(),
    rules.minLength(3),
    rules.maxLength(20)]),
    urn_type: schema.string([rules.required(),
    rules.minLength(30),
    rules.maxLength(20)]),
    id_service: schema.number([rules.required()]),
    id_room: schema.number([rules.required()])
  })

  public messages: CustomMessages = {
    'destination_ashes.required': 'El campo destination_ashes es obligatorio.',
    'destination_ashes.minLength': 'El campo destination_ashes debe destination_ashes minimo 3 caracteres.',
    'destination_ashes.maxLength': 'El campo destination_ashes debe tener maximo 20 caracteres.',
    'urn_type.required': 'El campo destination_ashes es obligatorio.',
    'urn_type.minLength': 'El campo urn_type debe destination_ashes minimo 3 caracteres.',
    'urn_type.maxLength': 'El campo urn_type debe tener maximo 20 caracteres.',
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_room.required': 'El campo id_room es obligatorio.',
  }
}
