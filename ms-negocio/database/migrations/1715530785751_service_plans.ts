import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServicePlansSchema extends BaseSchema {
  protected tableName = 'service_plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_service').unsigned().references('services.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_plan').unsigned().references('plans.id_plan').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}