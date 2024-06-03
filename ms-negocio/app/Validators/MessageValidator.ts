import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    content: schema.string([rules.required(),
    rules.minLength(3),
    rules.maxLength(200)]),
    date_shipment: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    read: schema.boolean([rules.required()]),
    id_chat: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'chats', column: 'id_chat'})])
  })

  public messages: CustomMessages = {

    'content.required': 'El campo content es obligatorio.',
    'content.minLength': 'El campo content debe tener minimo 3 caracteres.',
    'content.maxLength': 'El campo content debe tener exactamente 200 caracteres.',
    'date_shipment.format': 'El campo date_shipment debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'read.required': 'El campo price es obligatorio.',
    'id_chat.required': 'El campo id_chat es obligatorio.',
    'id_chat.range': 'El campo id_chat debe estar entre 1 y 100.',
    'id_chat.exists': 'El campo id_chat debe existir en la tabla chats.'
  }
}
