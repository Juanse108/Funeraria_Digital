import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_service: schema.number([rules.required(),rules.range(1,100), rules.exists({table: 'services', column: 'id_service'})]),
    content: schema.string([rules.required(), rules.maxLength(50)]),
    chat_status: schema.enum(['disponible', 'no disponible'] as const, [
        rules.required(),
      ]),
  })

  public messages: CustomMessages = {

    'id_service.required': 'El campo id_service es obligatorio.',
    'id_service.range': 'El campo id_service debe estar entre 1 y 100.',
    'id_service.exists': 'El campo id_service no existe en la tabla services.',
    'content.required': 'El campo content es obligatorio',
    'content.maxLength': 'El campo content debe tener maximo 50 caracteres.',
    'chat_srate.required': 'El campo chat_srate es obligatorio.',
    'chat_srate.enum': 'El campo chat_srate debe ser uno de los siguientes valores: {{ allowedValues }}'
  }
}
