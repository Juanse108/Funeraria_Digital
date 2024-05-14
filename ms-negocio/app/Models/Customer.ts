import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import Subscription from './Subscription'
import Beneficiary from './Beneficiary'
import Owner from './Owner'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public registration_date: DateTime

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => ServiceExecution, { foreignKey: 'customer_id' })
  public service_executions: HasMany<typeof ServiceExecution>;

  @hasMany(() => Subscription, { foreignKey: 'customer_id' })
  public subscriptions: HasMany<typeof Subscription>;

  @hasMany(() => Owner, { foreignKey: 'id_customer' })
  public owners: HasMany<typeof Owner>;

  @hasMany(() => Beneficiary, { foreignKey: 'id_customer' })
  public beneficiaries: HasMany<typeof Beneficiary>;
}
