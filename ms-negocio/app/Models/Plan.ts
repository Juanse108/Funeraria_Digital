import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan';
import Subscription from './Subscription';
// import FuneralRoom from './FuneralRoom'
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


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ServicePlan, { foreignKey: 'id_plan' })
  public serviceplan: HasMany<typeof ServicePlan>;

  @hasMany(() => Subscription, { foreignKey: 'id_customer' })
  public subscriptions: HasMany<typeof Subscription>;

  // @belongsTo(() => FuneralRoom, {
  //   foreignKey: 'id_room'
  // })
  // public customer: BelongsTo<typeof FuneralRoom>;
}
