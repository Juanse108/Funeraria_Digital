import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BeneficiariesSchema extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_customer').unsigned().references('customer.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('id_account_holder').unsigned().references('account_holder.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('relationship_account_holder')
      table.date('start_date')
      table.date('end_date').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
