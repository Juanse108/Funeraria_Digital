import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_driver')
      table.string('name')
      table.string('lastname')
      table.string('citizen_document')
      table.string('age')
      table.string('gender')
      table.string('license')
      table.boolean('disponibility')
      table.integer('years_experience')
      table.integer('phone')
      table.string('email')
      table.string('assigned vehicle')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


