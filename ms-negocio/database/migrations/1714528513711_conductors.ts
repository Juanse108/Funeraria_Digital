import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conductors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_conductor')
      table.increments('nombre')
      table.increments('apellido')
      table.increments('ced_ciudadania')
      table.increments('edad')
      table.increments('licencia')
      table.increments('disponibilidad')
      table.increments('años_experiencia')
      table.increments('telefono')
      table.increments('correo_electronico')
      table.increments('vehiculo_asignado')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


