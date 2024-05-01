import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio';

export default class ComentarioCalificacion extends BaseModel {
  protected table = 'comentario_calificaciones';

  @column({ isPrimary: true })
  public id: number

  @column()
  public cod_servicio: number

  @column()
  public calificacion: number

  @column()
  public comentario: string

  @column.dateTime()
  public fecha: DateTime
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => EjecucionServicio, {
    foreignKey: 'cod_servicio'
  })
  public ejecucion_servicio: BelongsTo<typeof EjecucionServicio>;
}
