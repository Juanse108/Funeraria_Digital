import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id_chat: number

  @column()
  public cod_servicio: string

  @column()
  public estado_chat: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => EjecucionServicio, {
    foreignKey: 'cod_servicio'
  })
  public ejecucion_servicio: BelongsTo<typeof EjecucionServicio>;
}
