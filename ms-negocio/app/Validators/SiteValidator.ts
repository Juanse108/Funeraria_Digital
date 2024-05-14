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
}
