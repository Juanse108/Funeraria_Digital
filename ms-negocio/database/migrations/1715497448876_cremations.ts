import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cremations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_cremation')
      table.string('destination_ashes', 255).notNullable()
      table.string('urn_type', 255).notNullable()
      table.integer('id_service').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
