import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id_chat: number

  @column()
  public id_service: number

  @column()
  public content:string

  @column()
  public chat_status:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'id_service'
  })
  public ejecucion_servicio: BelongsTo<typeof ServiceExecution>;

  @hasMany(() => Message, { foreignKey:'id_message'})
  public messages: HasMany<typeof Message>;
}
