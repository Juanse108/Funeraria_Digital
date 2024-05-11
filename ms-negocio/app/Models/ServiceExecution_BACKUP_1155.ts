import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
<<<<<<< HEAD:ms-negocio/app/Models/EjecucionServicio.ts
import Cliente from './Cliente'
import Servicio from './Service'
import ComentarioCalificacion from './ComentarioCalificacion'
=======
import Customer from './Customer'
import Servicio from './Servicio'
import CommentRating from './CommentRating'
>>>>>>> 25be668f4310991914397cdcfd4bf3e3d875c944:ms-negocio/app/Models/ServiceExecution.ts
import Chat from './Chat'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_code: number

  @column()
  public customer_id: number

  @column()
  public service_id: number

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>;

  @hasMany(() => CommentRating, { foreignKey: 'cod_servicio'})
  public comentarioCalifcacion: HasMany<typeof CommentRating>;

  @hasOne(() => Chat, { foreignKey: 'cod_servicio'})
  public chat: HasOne<typeof Chat>;
}
