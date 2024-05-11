import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'
import Suscripcion from './Suscripcion'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_usuario: number

  @column()
  public nombres: string

  @column()
  public apellidos: string

  @column()
  public correo_electronico: string

  @column()
  public direccion: string

  @column()
  public telefono:number

  @column()
  public genero: string

  @column()
  public activo: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() =>  EjecucionServicio, { foreignKey: 'id_cliente'})
  public ejecucion_servicios: HasMany<typeof EjecucionServicio>;

  @hasMany(() =>  Suscripcion, { foreignKey: 'id_cliente'})
  public suscripciones: HasMany<typeof Suscripcion>;
}
