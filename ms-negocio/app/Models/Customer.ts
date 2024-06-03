import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import Subscription from './Subscription'
import Beneficiary from './Beneficiary'
import Owner from './Owner'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id_customer: number

  @column()
  public user_id: string

  @column.dateTime()
  public registration_date: DateTime

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ServiceExecution, { foreignKey: 'id_customer' })
  public service_executions: HasMany<typeof ServiceExecution>;

  @hasMany(() => Subscription, { foreignKey: 'id_customer' })
  public subscriptions: HasMany<typeof Subscription>;

  @hasMany(() => Owner, { foreignKey: 'id_customer' })
  public owners: HasMany<typeof Owner>;

  @hasMany(() => Beneficiary, { foreignKey: 'id_customer' })
  public beneficiaries: HasMany<typeof Beneficiary>;
}
