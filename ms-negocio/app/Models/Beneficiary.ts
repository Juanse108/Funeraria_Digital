import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public account_holder_id: number

  @column()
  public relationship: string

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime | null

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>;

  // @belongsTo(() => AccountHolder, {
  //   foreignKey: 'account_holder_id',
  // })
  // public accountHolder: BelongsTo<typeof accountHolder>;
}
