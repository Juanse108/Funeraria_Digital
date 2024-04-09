import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Suscripcion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fechaInicio: DateTime

  @column()
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
