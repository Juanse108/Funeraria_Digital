import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('subscription_id')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_plan').unsigned().references('plans.id_plan').onDelete('CASCADE').onUpdate('CASCADE')
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
