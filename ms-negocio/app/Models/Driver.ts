import { DateTime } from 'luxon'
import { column, BelongsTo, belongsTo, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Relocation from './Relocation'
import Customer from './Customer'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id_driver: number

  @column()
  public user_id: number

  @column()
  public license:string

  @column()
  public disponibility:boolean

  @column()
  public years_experience:number

  @column()
  public assigned_vehicle:string

  @belongsTo(() => Relocation, {
    foreignKey: 'id_relocation'
  })
  public relocation: BelongsTo<typeof Relocation>;
  
  @belongsTo(() => Customer, {
    foreignKey: 'id_customer'
  })
  public customer: BelongsTo<typeof Customer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
