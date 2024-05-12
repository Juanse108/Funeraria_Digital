import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_room')

      table.integer('capacity')

      table.integer('chairs_number')

      table.integer('id')

      //Implementación de Relación con Sede, en donde Sede hereda el atributo PK de sí, es  decir id_sede_funeraria

      table.integer('id_site_funeral').unsigned().references('sites.id_site_funeral').onDelete('CASCADE')


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
