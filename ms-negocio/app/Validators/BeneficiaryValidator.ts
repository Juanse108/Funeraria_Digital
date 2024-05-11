import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_customer: schema.number(),
    id_account_holder: schema.number(),
    relationship_account_holder: schema.enum(['Hijo', 'Hija', 'Hermano', 'Hermana', 'Padre','Madre', 'Cónyugue', 'Otro' ] as const, [
      rules.required()]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }),
    end_date: schema.date.optional({ format: 'yyyy-MM-dd' }),
  })

  public messages: CustomMessages = {
    'id_customer.required': 'El campo id_customer es obligatorio.',
    'id_account_holder.required': 'El campo id_account_holder es obligatorio.',
    'relationship_account_holder.required': 'El campo relationship_account_holder es obligatorio.',
    'relationship_account_holder.enum': 'El campo relationship_account_holder debe ser uno de los siguientes valores: {{ allowedValues }}.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'start_date.date': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.date': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'status.required': 'El campo status es obligatorio.',
    'status.enum': 'El campo status debe ser "active" o "inactive".',
  }
}
