import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Camera from './Camera'
import ServiceExecution from './ServiceExecution'

export default class Transmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public camera_id: number

  @column()
  public service_execution_id: number

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin: DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id'
  })

  public service_execution: BelongsTo<typeof ServiceExecution>;

  @belongsTo(() => Camera, {
    foreignKey: 'camera_id'
  })

  public camera: BelongsTo<typeof Camera>;

}
