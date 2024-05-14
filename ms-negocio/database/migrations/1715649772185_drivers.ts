import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_driver').notNullable()
      table.string('user_id').notNullable()
      table.string('license').notNullable()
      table.string('disponibility').notNullable()
      table.integer('years_experience').notNullable()
      table.string('assigned_vehicle').notNullable() 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}


