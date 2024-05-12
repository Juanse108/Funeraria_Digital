import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan';
import Subscription from './Subscription';
import Room from './Room';
export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id_plan: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public number_beneficiaries: number

  @column()
  public id_room: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ServicePlan, { foreignKey: 'id_plan' })
  public serviceplans: HasMany<typeof ServicePlan>;

  @hasMany(() => Subscription, { foreignKey: 'id_customer' })
  public subscriptions: HasMany<typeof Subscription>;

  @belongsTo(() => Room, {
    foreignKey: 'id_room'
  })
  public room: BelongsTo<typeof Room>;
}
