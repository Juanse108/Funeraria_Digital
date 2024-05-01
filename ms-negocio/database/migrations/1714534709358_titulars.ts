import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'titulars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_titular')
      table.increments('nombre')
      table.increments('apellido')
      table.increments('ced_ciudadania')
      table.increments('edad')
      table.increments('direccion')
      table.increments('telefono')
      table.increments('correo_electronico')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
