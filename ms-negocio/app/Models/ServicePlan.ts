import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServicePlan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_service: number

  @column()
  public id_plan: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
