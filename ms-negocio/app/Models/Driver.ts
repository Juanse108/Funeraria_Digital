import { DateTime } from 'luxon'
import { column, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Relocation from './Relocation'

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

  @hasMany(() => Relocation, { foreignKey: 'assigned_driver' })
  public relocations: HasMany<typeof Relocation>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
