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
  public customer_id: number


  @column()
  public id_service: number

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Payment, { foreignKey: 'subscription_id' })
  public payments: HasMany<typeof Payment>;

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Plan, {
    foreignKey: 'id_service'
  })
  public servicio: BelongsTo<typeof Plan>;
}
