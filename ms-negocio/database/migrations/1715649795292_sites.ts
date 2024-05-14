import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_site_mortuary').notNullable()

      table.string('direction').notNullable()

      table.string('city').notNullable()

      table.string('department').notNullable()

      table.integer('phone').notNullable()

      table.integer('rooms_number').notNullable()

      table.dateTime('office_hour').notNullable() 


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

