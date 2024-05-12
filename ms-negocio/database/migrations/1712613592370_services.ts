import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_service')

      table.string('description')

      table.string('type_service')
      
      table.increments('servicios_solicitados').unsigned().references('id_servicio_plan').onDelete('CASCADE').onUpdate('CASCADE')
      table.increments('servicios_por_cliente').unsigned().references('id_service').onDelete('CASCADE').onUpdate('CASCADE')
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
