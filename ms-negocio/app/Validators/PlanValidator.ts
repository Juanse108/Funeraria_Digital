import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(24),
      rules.maxLength(24)
    ]),
    description: schema.string([
      rules.required(),
      rules.minLength(50),
      rules.maxLength(50)
    ]),
    price: schema.number([
      rules.required()
    ]),
    number_beneficiaries: schema.number([rules.required()])
  })

  public messages: CustomMessages = {
    'name.required': 'El campo name es obligatorio.',
    'name.minLength': 'El campo name debe tener exactamente 24 caracteres.',
    'name.maxLength': 'El campo name debe tener exactamente 24 caracteres.',
    'description.required': 'El campo description es obligatorio.',
    'description.minLength': 'El campo description debe tener exactamente 50 caracteres.',
    'description.maxLength': 'El campo description debe tener exactamente 50 caracteres.',
    'price.required': 'El campo price es obligatorio.',
    'number_beneficiaries.required': 'El campo number_beneficiaries es obligatorio.',
  }
}
