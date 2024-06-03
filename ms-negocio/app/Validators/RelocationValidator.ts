import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id_service: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'services', column: 'id_service'})]),
    id_driver: schema.number([rules.required(), rules.exists({table: 'drivers', column: 'id_driver'})]),
    departure_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    finish_date: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    origin: schema.string([rules.required(),rules.maxLength(20)]),
    destiny:schema.string([rules.required(),rules.maxLength(20)])
  })

  public messages: CustomMessages = {

    'id_service.required': 'El campo id_relocation es obligatorio.',
    'id_service.range': 'El campo id_relocation debe estar entre 1 y 100.',
    'id_service.exists': 'El campo id_relocation debe existir en la tabla relocations.',
    'departure_date.format': 'El campo departure_date debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'foinish_date.format': 'El campo finish_date debe tener el formato yyyy-MM-dd HH:mm:ss.',
    'origin.required': 'El campo origin es obligatorio.',
    'origin.maxLength': 'El campo origin debe tener maximo 20 caracteres.',
    'destiny.required': 'El campo destiny es obligatorio.',
    'destiny.maxLength': 'El campo destiny debe tener maximo 20 caracteres.',
    'id_driver': 'El campo id_driver es obligatorio',
    'id_driver.exists': 'El campo id_driver debe existir en la tabla drivers.'
  }
}
