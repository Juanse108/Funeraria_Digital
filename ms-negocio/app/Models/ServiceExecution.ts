import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Service from './Service'
import CommentRating from './CommentRating'
import Chat from './Chat'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public service_code: number

  @column()
  public id_customer: number

  @column()
  public id_service: number

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column()
  public deceased_location: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'id_customer'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Service, {
    foreignKey: 'id_service'
  })
  public service: BelongsTo<typeof Service>;


  @hasMany(() => CommentRating, { foreignKey: 'service_code' })
  public commentRatings: HasMany<typeof CommentRating>;


  @hasOne(() => Chat, { foreignKey: 'service_code' })
  public chats: HasOne<typeof Chat>;
}
