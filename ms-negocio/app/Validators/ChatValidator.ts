import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    service_code: schema.number([rules.required(),rules.range(1,100), rules.exists({table: 'service_executions', column: 'service_code'})]),
    content: schema.string([rules.required(), rules.maxLength(50)]),
    chat_status: schema.enum(['disponible', 'no disponible'] as const, [
        rules.required(),
      ]),
  })

  public messages: CustomMessages = {

    'service_code.required': 'El campo service_code es obligatorio.',
    'service_code.range': 'El campo service_code debe estar entre 1 y 100.',
    'service_code.exists': 'El campo service_code no existe en la tabla services.',
    'content.required': 'El campo content es obligatorio',
    'content.maxLength': 'El campo content debe tener maximo 50 caracteres.',
    'chat_srate.required': 'El campo chat_srate es obligatorio.',
    'chat_srate.enum': 'El campo chat_srate debe ser uno de los siguientes valores: {{ allowedValues }}'
  }
}
