import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_site_mortuary:schema.number([rules.required()]),
    direction: schema.number([rules.required(),rules.maxLength(50)]),
    city: schema.string([rules.required()]),
    department: schema.string([rules.required()]),
    phone: schema.number([rules.required(), rules.maxLength(12)]),
    roooms_number: schema.number([rules.required()]),
    office_hours: schema.string.optional(),
    
   
  })

  public messages: CustomMessages = {
    'id_site_mortuary.required': 'El campo id_site_mortuary es obligatorio.',
    'direction.required': 'El campo direction es obligatorio.',
    'direction.maxLength': 'El campo direction tiene un máximo de caracteres de 50.',
    'department.required': 'El campo department es obligatorio.',
    'phone.required': 'El campo phone es obligatorio',
    'phone.maxLenght': 'El campo phone tiene un máximo de 12 caracteres',
  }
}
