import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentRatingValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_code: schema.number([rules.required() , rules.range(1,100), rules.exists({table: 'service_executions', column: 'service_code'})]),
    rating: schema.number.optional([
      rules.range(1, 5),
    ]),
    comment: schema.string.optional( [
      rules.maxLength(300),
    ])  })

  public messages: CustomMessages = {
    'service_code.required': 'El campo service_code es obligatorio.',
    'service_code.range': 'El campo service_code debe estar entre 1 y 100.',
    'service_code.exists': 'El campo service_code no existe en la tabla services.',
    'rating.range': 'El campo rating debe estar entre 1 y 5.',
    'comment.string': 'El campo comment debe ser una cadena de texto.',

  }
}
