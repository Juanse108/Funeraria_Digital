import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_executions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('service_code')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('service_id').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('deceased_location')
      table.timestamp('start_date')
      table.timestamp('end_date')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
