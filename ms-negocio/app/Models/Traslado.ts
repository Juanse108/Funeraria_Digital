import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Traslado extends BaseModel {
  @column({ isPrimary: true })
  public id_traslado: number


  @column()
  public fecha_hora_salida:DateTime

  @column()
  public fecha_hora_fin:DateTime

  @column()
  public origen:string

  @column()
  public destino:string

  @column()
  public distancia:number

  @column()
  public costo:number

  @column()
  public vehiculo_asignado:string 

  @column()
  public conductor_asignado:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
