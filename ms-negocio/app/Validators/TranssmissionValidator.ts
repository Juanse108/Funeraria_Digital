import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TranssmissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    camera_id: schema.number([rules.required(), rules.range(1,100)]),
    service_execution_id: schema.number([rules.required(), rules.range(1,100)]),
    fecha_inicio: schema.date({format:'yyyy-MM-dd HH:mm:ss'}),
    fecha_fin: schema.date({format:'yyyy-MM-dd HH:mm:ss'})
  })

  public messages: CustomMessages = {}
}
