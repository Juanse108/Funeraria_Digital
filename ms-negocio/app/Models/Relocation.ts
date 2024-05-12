import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
// import Driver from './Driver'

export default class Traslado extends BaseModel {
  @column({ isPrimary: true })
  public id_relocation: number

  @column()
  public departure_date: DateTime

  @column()
  public finish_date: DateTime

  @column()
  public origin: string

  @column()
  public destiny: string

  @column()
  public assigned_vehicle: string

  @belongsTo(() => Service, {
    foreignKey: 'id_service'
  })
  public id_service: BelongsTo<typeof Service>;

  // @hasMany(() => Driver, { foreignKey: 'id_driver'})
  // public id_driver: HasMany<typeof Driver>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
