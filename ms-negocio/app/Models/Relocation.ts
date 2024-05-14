import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Driver from './Driver'

export default class Relocation extends BaseModel {
  @column({ isPrimary: true })
  public id_relocation: number

  @column()
  public id_service: number

  @column()
  public assigned_driver: number

  @column()
  public departure_date: string

  @column()
  public finish_date: string

  @column()
  public origin: string

  @column()
  public destiny: string


  @belongsTo(() => Service, {
    foreignKey: 'id_service'
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Driver, {
    foreignKey: 'assigned_driver'
  })
  public driver: BelongsTo<typeof Driver>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
