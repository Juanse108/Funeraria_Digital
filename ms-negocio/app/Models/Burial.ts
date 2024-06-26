import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Room from './Room'

export default class Burial extends BaseModel {
  @column({ isPrimary: true })
  public id_burial: number

  @column()
  public land_location: string

  @column()
  public casket_type: string

  @column()
  public id_service: number

  @column()
  public id_room: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'id_service'
  })
  public service: BelongsTo<typeof Service>;


  @belongsTo(() => Room, {
    foreignKey: 'id_room'
  })
  public room: BelongsTo<typeof Room>;
}
