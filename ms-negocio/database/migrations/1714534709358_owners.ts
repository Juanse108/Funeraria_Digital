import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'owners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_owner')
      table.integer('id_customer').unsigned().references('id_customer').onDelete('CASCADE').onUpdate('CASCADE')
      table.boolean('active')
      

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
