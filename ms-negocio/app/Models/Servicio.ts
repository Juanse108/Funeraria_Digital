import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import ServicePlan from './ServicePlan'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id_servicio: number

  @column()
  public descripcion: string

  @column()
  public tipo_servicio: string

    // Implementación de relación muchos a muchos con la tabla Solicitud_servicio

  @manyToMany(() => ServicePlan, {
      pivotTable: 'ServicePlan', //Clase pivote o intermedia que nace de la relación muchos a muchos con Servicio y Solicitud Servicio
  
      pivotForeignKey: 'id_servicio', //Atributo que hereda la clase Servicio a la clase intermedia Servicio Solicitado
  
      pivotColumns: ['id_plan'] //Atributos únicos de la clase intermedia Servicio Solicitado
    } )
  public servicios_solicitados: ManyToMany<typeof ServicePlan> 
  
    
  @manyToMany(() => ServiceExecution, {
    pivotTable: 'ServiceExecution', //Clase pivote o intermedia que nace de la relación muchos a muchos con Servicio y Solicitud Servicio

    pivotForeignKey: 'id_servicio', //Atributo que hereda la clase Servicio a la clase intermedia Servicio Solicitado

    pivotColumns: ['codigo_servicio','fecha_inicio','fecha_fin'] //Atributos únicos de la clase intermedia Servicio Solicitado
  } )
  public servicios_por_customer: ManyToMany<typeof ServiceExecution> 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() =>  ServiceExecution, { foreignKey: 'id_servicio'})
  public service_executions: HasMany<typeof ServiceExecution>;
}
