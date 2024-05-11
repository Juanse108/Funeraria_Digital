import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'

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

  @belongsTo(() => Plan, {
    foreignKey: 'id_plan'
  })
  public plans: BelongsTo<typeof Plan>;

  // @belongsTo(() => Service, {
  //   foreignKey: 'id_service'
  // })
  // public services: BelongsTo<typeof Service>;
}
