import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Service from './Service'
import CommentRating from './CommentRating'
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


  @hasMany(() => CommentRating, { foreignKey: 'cod_servicio' })
  public commentRatings: HasMany<typeof CommentRating>;

  @hasOne(() => Chat, { foreignKey: 'cod_servicio' })
  public chats: HasOne<typeof Chat>;
}
