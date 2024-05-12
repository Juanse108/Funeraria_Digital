import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'
import Site from './Site'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id_room: number

  @column()
  public capacity: number

  @column()
  public chairs_number: number

  @column()
  public id_site_funeral:number

  @hasMany(() => Plan, { foreignKey: 'id_plan'})
  public plans: HasMany<typeof Plan>;

  @belongsTo(() => Site, {
    foreignKey: 'id_site_funeral'
  })
  public site_funeral: BelongsTo<typeof Site>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}