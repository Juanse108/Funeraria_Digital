import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'
import Message from './Mensaje'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id_chat: number

  @column()
  public service_code: string

  @column()
  public content:string

  @column()
  public chat_status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => EjecucionServicio, {
    foreignKey: 'cod_servicie'
  })
  public ejecucion_servicio: BelongsTo<typeof EjecucionServicio>;

  @hasMany(() => Message, { foreignKey:'id_message'})
  public messages: HasMany<typeof Message>;
}
