import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Service from './Service'
import CommentRating from './CommentRating'
import Chat from './Chat'
import Transmission from './Transmission'

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

  @column()
  public deceased_location: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>;

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>;


  @hasMany(() => CommentRating, { foreignKey: 'service_code' })
  public commentRatings: HasMany<typeof CommentRating>;

  @hasMany(() => Transmission, { foreignKey: 'service_execution_id' })
  public transmissions: HasMany<typeof Transmission>;

  @hasOne(() => Chat, { foreignKey: 'service_code' })
  public chats: HasOne<typeof Chat>;
}
