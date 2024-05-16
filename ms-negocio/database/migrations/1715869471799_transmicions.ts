import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTransmissionsTable extends BaseSchema {
  protected tableName = 'transmissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('camera_id').unsigned().references('cameras.id').onDelete('CASCADE')
      table.integer('service_execution_id').unsigned().references('service_executions.service_code').onDelete('CASCADE').onUpdate('CASCADE')
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
