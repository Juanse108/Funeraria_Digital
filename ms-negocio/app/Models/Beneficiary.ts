import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Owner from './Owner'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_customer: number

  @column()
  public id_owner: number

  @column()
  public relationship_account_owner: string

  @column.date()
  public start_date: Date

  @column.date()
  public end_date: Date | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'id_customer'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Owner, {
    foreignKey: 'id_owner',
  })
  public owners: BelongsTo<typeof Owner>;
}
