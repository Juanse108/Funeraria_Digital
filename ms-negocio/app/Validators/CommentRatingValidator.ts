import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentRatingValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_service: schema.number([rules.required() , rules.range(1,100), rules.exists({table: 'services', column: 'id_service'})]),
    rating: schema.number.optional([
      rules.range(1, 5),
    ]),
    comment: schema.string.optional( [
      rules.maxLength(300),
    ])  })

  public messages: CustomMessages = {
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_service.range': 'El campo id_service debe estar entre 1 y 100.',
    'id_service.exists': 'El campo id_service no existe en la tabla services.',
    'rating.range': 'El campo rating debe estar entre 1 y 5.',
    'comment.string': 'El campo comment debe ser una cadena de texto.',

  }
}
