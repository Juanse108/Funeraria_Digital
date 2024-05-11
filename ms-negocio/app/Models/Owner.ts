import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id_owner: number

  @column()
  public name:string

  @column()
  public lastname:string

  @column()
  public citizen_document:number

  @column()
  public age:number

  @column()
  public direction:string

  @column()
  public phone:number

  @column()
  public gender:string

  @column()
  public email:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
