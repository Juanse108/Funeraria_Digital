import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'traslados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_traslado')
      table.increments('fecha_hora_salida')
      table.increments('fecha_hora_fin')
      table.increments('origen')
      table.increments('destino')
      table.increments('distancia')
      table.increments('costo')
      table.increments('vehiculo_asignado')
      table.increments('id_conductor').unsigned().references('id_conductor').onDelete('CASCADE').onUpdate('CASCADE')

      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
