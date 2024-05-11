import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Driver extends Cliente {
  @column({ isPrimary: true })
  public id_driver: number

  @column()
  public name:string

  @column()
  public lastname:string

  @column()
  public citizen_document:number

  @column()
  public age:number

  @column()
  public gender:string

  @column()
  public license:string

  @column()
  public disponibility:boolean

  @column()
  public years_experience:number

  @column()
  public phone:number

  @column()
  public email:string

  @column()
  public assigned_vehicle:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
