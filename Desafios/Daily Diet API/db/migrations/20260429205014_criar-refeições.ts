import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('refeicoes', (tabela) => {
        tabela.uuid('ID').primary()
        tabela.uuid('ID_Usuario').index().notNullable()
        tabela.text('Nome').notNullable()
        tabela.text('Descricao').notNullable()
        tabela.timestamp("Data_e_hora").defaultTo(knex.fn.now()).notNullable()
        tabela.text('Esta_dentro_da_dieta').notNullable()
    })


}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('refeicoes')
}

