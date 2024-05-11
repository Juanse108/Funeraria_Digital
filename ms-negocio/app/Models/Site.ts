import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Room'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id_site_funeral: number

  @column()
  public direction: string

  @column()
  public city: string

  @column()
  public department: string

  @column()
  public phone: number

  @column()
  public rooms_number: number // Número de salas

  @column()
  public office_hours: DateTime // Horarios de atención

  @hasMany(() => Sala, {
    foreignKey: 'id_sede_funeraria',
  })
  public rooms: HasMany<typeof Sala>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
