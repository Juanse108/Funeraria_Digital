import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public precio: number

  @column()
  public beneficiarios: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() =>  EjecucionServicio, { foreignKey: 'id_servicio'})
  public ejecucion_servicios: HasMany<typeof EjecucionServicio>;
}
