import { schema, CustomMessages , rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_service: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'services', column: 'id_service'})]),
    id_plan: schema.number([rules.required(), rules.range(1,100), rules.exists({table: 'plans', column: 'id_plan'})]),
  })

  public messages: CustomMessages = {
    'id_service.required': 'El campo id_service es obligatorio.',
    'id_service.range': 'El campo id_service debe estar entre 1 y 100.',
    'id_service.exists': 'El campo id_service no existe en la tabla services.',
    'id_plan.required': 'El campo id_plan es obligatorio.',
    'id_plan.range': 'El campo id_plan debe estar entre 1 y 100.',
    'id_plan.exists': 'El campo id_plan no existe en la tabla plans.',
  }
}
