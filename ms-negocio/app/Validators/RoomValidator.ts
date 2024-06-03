import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    capacity: schema.number([rules.required(),rules.range(1, 100)]),
    chairs_number: schema.number([rules.required(), rules.range(1, 50)]),
    id_site_mortuary: schema.number([
      rules.required(),
      rules.range(1,100),
      rules.exists({ table: 'sites', column: 'id_site_mortuary' })
    ]),
  })

  public messages: CustomMessages = {

    'capacity.required': 'El campo id_room es obligatorio.',
    'capacity.range': 'El campo capacity debe estar entre 1 y 100.',
    'chairs_number.required': 'El campo chairs_number es obligatorio.',
    'chairs_number.range': 'El campo chairs_number debe estar entre 1 y 50.',
    'id_site_mortuary.required': 'El campo id_site_mortuary es obligatorio',
    'id_site_mortuary.range': 'El campo id_site_mortuary debe estar entre 1 y 100.',
    'id_site_mortuary.exists': 'El campo id_site_mortuary no existe en la tabla sites.'
  }
}
