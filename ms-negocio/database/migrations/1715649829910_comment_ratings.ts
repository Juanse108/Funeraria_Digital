
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CommentRatingSchema extends BaseSchema {
  protected tableName = 'comment_ratings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('id_service').unsigned().references('service_executions.id_service').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('rating').nullable()
      table.string('comment').nullable()
      table.timestamp('date')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
