import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution';

export default class CommentRating extends BaseModel {
  protected table = 'comment_ratings';

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_service: number

  @column()
  public rating: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public date: DateTime
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => ServiceExecution, {
    foreignKey: 'id_service'
  })
  public service_execution: BelongsTo<typeof ServiceExecution>;
}
