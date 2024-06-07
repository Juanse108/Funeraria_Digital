import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string
  
  @column()
  public content: string

  @column.dateTime()
  public date_shipment: DateTime

  @column()
  public read: boolean

  @column()
  public id_chat: number


  @belongsTo(() => Chat, {
    foreignKey: 'id_chat'
  })

  public chat: BelongsTo<typeof Chat>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
