import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_customer: schema.number([rules.required(), rules.range(1,100)]),
    id_owner: schema.number([rules.required(), rules.range(1,100)]),
    relationship_account_owner: schema.enum(['Hijo', 'Hija', 'Hermano', 'Hermana', 'Padre','Madre', 'Cónyugue', 'Otro' ] as const, [
      rules.required()]),
    start_date: schema.string( [rules.required()]),
    end_date: schema.string.optional(),
  })

  public messages: CustomMessages = {
    'id_customer.required': 'El campo id_customer es obligatorio.',
    'id_owner.required': 'El campo id_owner es obligatorio.',
    'relationship_account_owner.required': 'El campo relationship_account_owner es obligatorio.',
    'relationship_account_owner.enum': 'El campo relationship_account_owner debe ser uno de los siguientes valores: {{ allowedValues }}.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'start_date.date': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.date': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.'
  }
}
