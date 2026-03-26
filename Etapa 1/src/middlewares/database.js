// { users: [...]}

import fs from 'node:fs/promises'

const databasepath = new URL('../../db.json', import.meta.url) // Especifica o nome que eu quero , pasta onde deve aparecer

export class Database {
#database = {} //a Hashtag faz com que essa propriedade seja privada dessa classe, e so da pra acessar ela nesse arquivo

constructor() {
    fs.readFile(databasepath, 'utf8').then(data => {
        this.#database = JSON.parse(data)
    })
    .catch(() => {
        this.#persist()
    })
}

#persist() {
    fs.writeFile(databasepath, JSON.stringify(this.#database))
}

select(tabela, search) {
    
    let data = this.#database[tabela] ?? [] //Procurar se tem uma chave dentro da database com o nome "tabela" e se não existir retornar um array vazio []

    if(search) {
        data = data.filter(row => {
            return Object.entries(search).some(([key, value]) => {
                return row[key].toLowerCase().includes(value.toLowerCase())
            })
        })
    }

    return data
}

insert(tabela, data) {
    if (Array.isArray(this.#database[tabela])) { // Se ja existe array na tabela 
        this.#database[tabela].push(data) // adicionar o novo item nas tabela
    } else {
        this.#database[tabela] = [data] // se não, criar novo array com o item la dentro
    }
    
    this.#persist()
    return data;
}
    delete(table, id) {
        const rowindex = this.#database[table].findIndex(row => row.id === id) //Percorre os registros de users, procurando se tem algum usuario com o id que foi botado no parâmetro pra ser deletado
    
    if (rowindex > -1) {
        this.#database[table].splice(rowindex, 1)
        this.#persist()
    }
    }
}