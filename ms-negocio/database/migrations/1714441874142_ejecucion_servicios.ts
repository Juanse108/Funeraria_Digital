import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ejecucion_servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('')
      table.integer('id_cliente').unsigned().references('clientes.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_servicio').unsigned().references('servicios.id_servicio').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('fecha_inicio')
      table.timestamp('fecha_fin')  
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
