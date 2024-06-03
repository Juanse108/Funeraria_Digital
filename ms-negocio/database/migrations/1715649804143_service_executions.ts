import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_executions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('service_code').notNullable()
      table.integer('id_customer').unsigned().references('customers.id_customer').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_service').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('deceased_location').notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
