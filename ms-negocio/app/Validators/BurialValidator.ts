import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    land_location: schema.string([rules.required(),
    rules.minLength(3),
    rules.maxLength(20)]),
    casket_type: schema.string([rules.required(),
    rules.minLength(3),
    rules.maxLength(20)]),
    id_service: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'services', column: 'id_service'})]),
    id_room: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'rooms', column: 'id_room'})])
  })

  public messages: CustomMessages = {

    'land_location.required': 'El campo land_location es obligatorio.',
    'land_location.minLength': 'El campo land_location debe destination_ashes minimo 3 caracteres.',
    'land_location.maxLength': 'El campo land_location debe tener maximo 20 caracteres.',
    'casket_type.required': 'El campo destination_ashes es obligatorio.',
    'casket_type.minLength': 'El campo casket_type debe destination_ashes minimo 3 caracteres.',
    'casket_type.maxLength': 'El campo casket_type debe tener maximo 20 caracteres.',
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_service.range': 'El campo id_service debe estar entre 1 y 100.',
    'id_service.exists': 'El campo id_service no existe en la tabla services.',
    'id_room.required': 'El campo id_room es obligatorio.',
    'id_room.range': 'El campo id_room debe estar entre 1 y 100.',
    'id_room.exists': 'El campo id_room no existe en la tabla rooms.'
  }
}
