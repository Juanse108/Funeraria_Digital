import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Titular extends BaseModel {
  @column({ isPrimary: true })
  public id_titular: number

  @column()
  public nombre:string

  @column()
  public apellido:string

  @column()
  public ced_ciudadania:number

  @column()
  public edad:number

  @column()
  public direccion:string

  @column()
  public telefono:number

  @column()
  public correo_electronico:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
