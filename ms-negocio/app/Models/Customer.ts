import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import Subscription from './Subscription'
import Titular from './Titular'
import Beneficiary from './Beneficiary'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public status: string

  @column()
  public registration_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => ServiceExecution, { foreignKey: 'id_customer' })
  public service_executions: HasMany<typeof ServiceExecution>;

  @hasMany(() => Subscription, { foreignKey: 'id_customer' })
  public subscriptions: HasMany<typeof Subscription>;

  @hasMany(() => Titular, { foreignKey: 'id_customer' })
  public titular: HasMany<typeof Titular>;

  @hasMany(() => Beneficiary, { foreignKey: 'id_customer' })
  public beneficiaries: HasMany<typeof Beneficiary>;
}
