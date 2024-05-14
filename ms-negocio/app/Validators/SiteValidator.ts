<<<<<<< HEAD
import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  validate(arg0: { schema: any; data: { direction: string; city: any; department: string; phone: number; rooms_number: number; office_hour: string } }) {
    throw new Error('Method not implemented.')
  }
  static schema: any
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    direction: schema.string([rules.required()]),
    city: schema.string([rules.required()]),
    department: schema.string([
      rules.required()]),
      phone: schema.number([rules.required()]),
      rooms_number: schema.number([rules.required()]),
      office_hour: schema.string([rules.required()])
  })
  public messages: CustomMessages = {}
=======
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
>>>>>>> d2980a8f54e741f4050acf31f21d7024a272986b
}
