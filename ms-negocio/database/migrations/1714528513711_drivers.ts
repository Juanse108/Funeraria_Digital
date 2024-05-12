import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_driver')
      table.integer('id_customer').unsigned().references('id_customer').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('license')
      table.boolean('disponibility')
      table.integer('years_experience')
      table.string('assigned vehicle') // Hace falta implementar entidad
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


