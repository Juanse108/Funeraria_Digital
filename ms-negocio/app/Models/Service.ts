import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import ServicePlan from './ServicePlan'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id_service: number

  @column()
  public description: string

  @column()
  public type_service: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // 1 a n con ServiceExecution
  @hasMany(() =>  ServiceExecution, { foreignKey: 'id_service'})
  public service_executions: HasMany<typeof ServiceExecution>;
  
  // 1 a n con ServicePlan
  @hasMany(() =>  ServicePlan, { foreignKey: 'id_service_plan'})
  public service_plans: HasMany<typeof ServicePlan>;
}
