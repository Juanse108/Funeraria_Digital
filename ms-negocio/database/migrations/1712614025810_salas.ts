import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_sala')

      table.integer('capacidad')

      table.integer('numero_sillas')


      //Implementación de Relación con Sede, en donde Sede hereda el atributo PK de sí, es  decir id_sede_funeraria

      table.integer('id_sede_funeraria').unsigned()
                                        .references('sedes.id')
                                         .onDelete('CASCADE')
            
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
