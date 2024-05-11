import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Servicio from './Service'
import ComentarioCalificacion from './ComentarioCalificacion'
import Chat from './Chat'

export default class EjecucionServicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public codigo_servicio: number

  @column()
  public id_cliente: number

  @column()
  public id_servicio: number

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>;

  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>;

  @hasMany(() => ComentarioCalificacion, { foreignKey: 'cod_servicio'})
  public comentarioCalifcacion: HasMany<typeof ComentarioCalificacion>;

  @hasOne(() => Chat, { foreignKey: 'cod_servicio'})
  public chat: HasOne<typeof Chat>;
}
