import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([rules.required(), rules.maxLength(200), rules.minLength(10)]),
    type_service: schema.string([rules.required(), rules.minLength(8), rules.maxLength(25)]),
  })

  public messages: CustomMessages = {
    'description.required': 'El campo description es obligatorio.',
    'description.maxLength': 'El campo description tiene un máximo de 200 caracteres',
    'description.minLength':'El campo description tiene un mínimo de 10 caracteres',
    'type_service.required': 'El campo type_service es obligatorio',
    'type_service.minLength': 'El campo type_service tiene un mínimo de caracteres de 8',
    'type_service.maxLength': 'El campo type_service tiene un máximo de caracteres de 25',
  }
}
