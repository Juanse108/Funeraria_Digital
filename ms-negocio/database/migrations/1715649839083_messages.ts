import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('content', 255).notNullable()
      table.timestamp('date_shipment').notNullable()
      table.boolean('read').notNullable()
      table.integer('id_chat').unsigned().references('chats.id_chat').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_customer').unsigned().references('customers.id_customer')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}