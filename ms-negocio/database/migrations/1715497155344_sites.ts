import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_site_mortuary')

      table.string('direction')

      table.string('city')

      table.string('department')

      table.integer('phone')

      table.integer('rooms_number')

      table.dateTime('office_hour') // Horario de atención

      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}


