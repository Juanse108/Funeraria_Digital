import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_customer: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'customers', column: 'id_customer'})]),
    id_owner: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'owners', column: 'id_owner'})]),
    relationship_account_owner: schema.enum(['Hijo', 'Hija', 'Hermano', 'Hermana', 'Padre','Madre', 'Cónyugue', 'Otro' ] as const, [
      rules.required()]),
    start_date: schema.date({format:'yyyy-MM-dd'}),
    end_date: schema.date.optional({format:'yyyy-MM-dd'}),
  })

  public messages: CustomMessages = {
    'id_customer.required': 'El campo id_customer es obligatorio.',
    'id_customer.range': 'El campo id_customer debe estar entre 1 y 100.',
    'id_customer.exists': 'El campo id_customer debe existir en la tabla customers.',
    'id_owner.required': 'El campo id_owner es obligatorio.',
    'id_owner.range': 'El campo id_owner debe estar entre 1 y 100.',
    'id_owner.exists': 'El campo id_owner debe existir en la tabla owners.',
    'relationship_account_owner.required': 'El campo relationship_account_owner es obligatorio.',
    'relationship_account_owner.enum': 'El campo relationship_account_owner debe ser uno de los siguientes valores: {{ allowedValues }}.',
    'start_date.required': 'El campo start_date es obligatorio.',
    'start_date.date': 'El campo start_date debe ser una fecha válida en formato yyyy-MM-dd.',
    'end_date.date': 'El campo end_date debe ser una fecha válida en formato yyyy-MM-dd.'
  }
}
