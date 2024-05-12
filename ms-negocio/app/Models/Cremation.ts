import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cremation extends BaseModel {
  @column({ isPrimary: true })
  public id_cremation: number

  @column()
  public destination_ashes: string

  @column()
  public urn_type: string

  @column()
  public id_service: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  // @belongsTo(() => Service, {
  //   foreignKey: 'id_service'
  // })
  // public subscription: BelongsTo<typeof Service>;
}
