import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'relocations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_relocation')
      table.timestamp('departure_date')
      table.timestamp('finish_date')
      table.string('origin')
      table.string('destiny')
      table.string('assigned_vehicle') // Hace falta implementar entidad Vehicle
      table.integer('assigned_driver').unsigned().references('id_driver').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_customer').unsigned().references('id_customer').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
