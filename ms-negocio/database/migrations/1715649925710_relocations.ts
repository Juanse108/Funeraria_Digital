import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'relocations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_relocation').notNullable()
      table.timestamp('departure_date').notNullable()
      table.timestamp('finish_date').notNullable()
      table.string('origin').notNullable()
      table.string('destiny').notNullable()
      table.integer('assigned_driver').unsigned().references('drivers.id_driver').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_service').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
