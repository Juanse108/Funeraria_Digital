import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id_site_mortuary: number

  @column()
  public direction: string

  @column()
  public city: string


  @column()
  public phone: bigint

  @column()
  public rooms_number: number // Número de salas

  @column()
  public office_hour: string // Horarios de atención

  @hasMany(() => Room, {
    foreignKey: 'id_site_mortuary',
  })
  public rooms: HasMany<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
