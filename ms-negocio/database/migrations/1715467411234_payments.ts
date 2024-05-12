import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('payment_date').notNullable()
      table.decimal('quantity').notNullable()
      table.string('payment_type', 255).notNullable()
      table.integer('discount').notNullable()
      table.integer('subscription_id').unsigned().references('subscriptions.subscription_id').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
