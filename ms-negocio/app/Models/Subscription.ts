import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Plan from './Plan'
import Payment from './Payment'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public subscription_id: number

  @column()
  public id_plan: number

  @column()
  public id_customer: number

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Payment, { foreignKey: 'subscription_id' })
  public payments: HasMany<typeof Payment>;

  @belongsTo(() => Customer, {
    foreignKey: 'id_customer'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Plan, {
    foreignKey: 'id_plan'
  })
  public servicio: BelongsTo<typeof Plan>;
}
