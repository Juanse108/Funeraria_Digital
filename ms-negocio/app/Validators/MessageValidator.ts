import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    content: schema.string([rules.required(),
    rules.minLength(3),
    rules.maxLength(50)]),
    date_shipment: schema.string([rules.required()]),
    read: schema.boolean([rules.required()]),
    id_chat: schema.number([rules.required(), rules.range(1,100)])
  })

  public messages: CustomMessages = {

    'content.required': 'El campo content es obligatorio.',
    'content.minLength': 'El campo content debe tener minimo 3 caracteres.',
    'content.maxLength': 'El campo content debe tener exactamente 24 caracteres.',
    'date_shipment.required': 'El campo description es obligatorio.',
    'read.required': 'El campo price es obligatorio.',
    'id_chat.required': 'El campo id_chat es obligatorio.',
  }
}
