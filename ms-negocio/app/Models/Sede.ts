import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Sede extends BaseModel {
  @column({ isPrimary: true })
  public id_sede_funeraria: number

  @column()
  public direccion: string

  @column()
  public ciudad: string

  @column()
  public departamento: string

  @column()
  public telefono: number

  @column()
  public numero_salas: number

  @column()
  public horario_atencion: DateTime

  @hasMany(() => Sala, {
    foreignKey: 'id_sede_funeraria',
  })
  public salas: HasMany<typeof Sala>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
