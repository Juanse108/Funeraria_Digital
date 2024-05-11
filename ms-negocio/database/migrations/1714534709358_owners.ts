import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'titulars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_owner')
      table.string('name')
      table.string('lastname')
      table.integer('citizen_document')
      table.integer('age')
      table.string('gender')
      table.string('direction')
      table.integer('phone')
      table.string('email')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
