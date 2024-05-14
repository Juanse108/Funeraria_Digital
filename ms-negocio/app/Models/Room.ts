import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Site from './Site'
import Burial from './Burial'
import Cremation from './Cremation'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id_room: number

  @column()
  public capacity: number

  @column()
  public chairs_number: number


  @column()
  public id_site_mortuary: number

  @hasMany(() => Burial, { foreignKey: 'id_room' })
  public burial: HasMany<typeof Burial>;

  @hasMany(() => Cremation, { foreignKey: 'id_room' })
  public cremation: HasMany<typeof Cremation>;


  @belongsTo(() => Site, {
    foreignKey: 'id_site_funeral'
  })
  public site_funeral: BelongsTo<typeof Site>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
