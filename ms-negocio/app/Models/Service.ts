import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import ServicePlan from './ServicePlan'
import Burial from './Burial'
import Cremation from './Cremation';
import Relocation from 'App/Models/Relocation';

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id_service: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public type_service: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // 1 a n con ServiceExecution
  @hasMany(() => ServiceExecution, { foreignKey: 'id_service' })
  public service_executions: HasMany<typeof ServiceExecution>;

  // 1 a n con ServicePlan
  @hasMany(() => ServicePlan, { foreignKey: 'id_service' })
  public service_plans: HasMany<typeof ServicePlan>;

  @hasMany(() => Burial, { foreignKey: 'id_service' })
  public burial: HasMany<typeof Burial>;

  @hasMany(() => Cremation, { foreignKey: 'id_service' })
  public cremation: HasMany<typeof Cremation>;

  @hasMany(() => Relocation, { foreignKey: 'id_service' })
  public relocation: HasMany<typeof Relocation>;


}
