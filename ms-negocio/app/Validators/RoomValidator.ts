import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    capacity: schema.number([rules.required(),rules.range(1, 100)]),
    chairs_number: schema.number([rules.required(), rules.range(1, 50)]),
    id_site_mortuary: schema.number([
      rules.required(),
    ]),
  })

  public messages: CustomMessages = {

    'id_room.required': 'El campo id_room es obligatorio.',
    'capacity.required': 'El campo capacity es obligatorio.',
    'chairs_number.required': 'El campo chairs_number es obligatorio.',
    'chairs_number.minLength': 'El campo chairs_number tiene un mínimo de 1 caracter.',
    'id_site_mortuary.required': 'El campo id_site_mortuary es obligatorio'
  }
}
