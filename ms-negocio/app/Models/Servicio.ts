import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'
import ServicioPlan from './ServicioPlan'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id_servicio: number

  @column()
  public descripcion: string

  @column()
  public tipo_servicio: string

    // Implementación de relación muchos a muchos con la tabla Solicitud_servicio

  @manyToMany(() => ServicioPlan, {
      pivotTable: 'ServicioPlan', //Clase pivote o intermedia que nace de la relación muchos a muchos con Servicio y Solicitud Servicio
  
      pivotForeignKey: 'id_servicio', //Atributo que hereda la clase Servicio a la clase intermedia Servicio Solicitado
  
      pivotColumns: ['id_plan'] //Atributos únicos de la clase intermedia Servicio Solicitado
    } )
  public servicios_solicitados: ManyToMany<typeof ServicioPlan> 
  
    
  @manyToMany(() => EjecucionServicio, {
    pivotTable: 'EjecucionServicio', //Clase pivote o intermedia que nace de la relación muchos a muchos con Servicio y Solicitud Servicio

    pivotForeignKey: 'id_servicio', //Atributo que hereda la clase Servicio a la clase intermedia Servicio Solicitado

    pivotColumns: ['codigo_servicio','fecha_inicio','fecha_fin'] //Atributos únicos de la clase intermedia Servicio Solicitado
  } )
  public servicios_por_cliente: ManyToMany<typeof EjecucionServicio> 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() =>  EjecucionServicio, { foreignKey: 'id_servicio'})
  public ejecucion_servicios: HasMany<typeof EjecucionServicio>;
}
