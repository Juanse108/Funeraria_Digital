import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_service: schema.number([rules.required(), rules.range(1,100)]),
    id_plan: schema.number([rules.required(), rules.range(1,100)]),
  })

  public messages: CustomMessages = {
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_plan.required': 'El campo id_plan es obligatorio.',
  }
}
