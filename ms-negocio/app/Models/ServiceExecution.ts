import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Servicio from './Servicio'
import CommentRating from './CommentRating'
import Chat from './Chat'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
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
    foreignKey: 'service_id'
  })
  public servicio: BelongsTo<typeof Servicio>;

  @hasMany(() => CommentRating, { foreignKey: 'cod_servicio'})
  public comentarioCalifcacion: HasMany<typeof CommentRating>;

  @hasOne(() => Chat, { foreignKey: 'cod_servicio'})
  public chat: HasOne<typeof Chat>;
}
