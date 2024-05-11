import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Traslado extends BaseModel {
  @column({ isPrimary: true })
  public id_relocation: number

  @column()
  public departure_date:DateTime

  @column()
  public finish_date:DateTime

  @column()
  public origin:string

  @column()
  public destiny:string

  @column()
  public id_client:number

  @column()
  public assigned_vehicle:string 

  @column()
  public assigned_driver:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
