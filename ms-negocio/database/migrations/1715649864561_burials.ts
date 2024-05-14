import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'burials'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_burial')
      table.string('land_location', 255).notNullable()
      table.string('casket_type', 255).notNullable()
      table.integer('id_service').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_room').unsigned().references('rooms.id_room').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
