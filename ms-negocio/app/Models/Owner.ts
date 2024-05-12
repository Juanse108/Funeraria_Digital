import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer';
import Beneficiary from './Beneficiary';

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id_owner: number

  @column()
  public active:boolean;

  
  @belongsTo(() => Customer, {
    foreignKey: 'id_customer'
  })
  public id_customer: BelongsTo<typeof Customer>;

  @hasMany(() => Beneficiary, { foreignKey: 'id_beneficiary'})
  public beneficiaries: HasMany<typeof Beneficiary>;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}