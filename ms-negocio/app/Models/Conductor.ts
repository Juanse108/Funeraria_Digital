import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id_conductor: number

  @column()
  public nombre:string

  @column()
  public apellido:string

  @column()
  public ced_ciudadania:number

  @column()
  public edad:number

  @column()
  public licencia:string

  @column()
  public disponibilidad:boolean

  @column()
  public años_experiencia:number

  @column()
  public telefono:number

  @column()
  public correo_electronico:string

  @column()
  public vehiculo_asignado:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
