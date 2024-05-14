import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Room from './Room'

export default class Cremation extends BaseModel {
  @column({ isPrimary: true })
  public id_cremation: number

  @column()
  public destination_ashes: string

  @column()
  public urn_type: string

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
  public subscription: BelongsTo<typeof Service>;

  @belongsTo(() => Room, {
    foreignKey: 'id_room'
  })
  public room: BelongsTo<typeof Room>;
}
