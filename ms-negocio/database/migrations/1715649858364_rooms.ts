import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_room').notNullable()
      table.integer('capacity').notNullable()
      table.integer('chairs_number').notNullable()
      table.integer('id_site_mortuary').unsigned()
        .references('sites.id_site_mortuary')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}