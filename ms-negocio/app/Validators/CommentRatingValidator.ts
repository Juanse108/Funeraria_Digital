import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentRatingValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_code: schema.number([rules.required() , rules.range(1,100)]),
    rating: schema.number.optional([
      rules.range(1, 5),
    ]),
    comment: schema.string.optional( [
      rules.maxLength(300),
    ])  })

  public messages: CustomMessages = {

    'rating.range': 'El campo rating debe estar entre 1 y 5.',
    'comment.string': 'El campo comment debe ser una cadena de texto.',

  }
}
