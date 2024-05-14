import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    service_code: schema.number([rules.required(),rules.range(1,100)]),
    content: schema.string([rules.required(), rules.maxLength(50)]),
    chat_status: schema.enum(['disponible', 'no disponible'] as const, [
        rules.required(),
      ]),
  })

  public messages: CustomMessages = {

    'id_chat.required': 'El campo id_chat es obligatorio.',
    'service_code.required': 'El campo service_code es obligatorio.',
    'content.required': 'El campo content es obligatorio',
    'chat_status':'El campo chat_status es obligatorio',
  }
}
