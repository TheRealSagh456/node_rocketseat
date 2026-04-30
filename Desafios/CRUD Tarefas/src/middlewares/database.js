//banco de dados feito em arquivo
//objeto {} pode armazenar arrays e informações

import fs from 'node:fs/promises'

const diretoriodatabase = new URL('../../db.json', import.meta.url)

export class Database { //dentro de uma classe vários métodos podem ser criados 
    #database = {}

    constructor() {
        fs.readFile(diretoriodatabase, "utf8").then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(diretoriodatabase, JSON.stringify(this.#database))
    }

    selecionar(tabela, search) {
        let data = this.#database[tabela] ?? [] //"tabela" é um tarefa qualquer que será acessado na database
        //se não achar o que procura (??) retorna um array vazio
        // this.databse[tabela]no lugar de usar "this.database.usuarios" ou "this.database.ids"
        // é melhor pois cria um método universal, basta trocar "tabela" pela informação desejada

        if(search) {
            data = data.filter(procurar => {
                return Object.entries(search).some(([chave, valor]) => {
                    return procurar[chave].toLowerCase().includes(valor.toLowerCase())
                })
            })
        }
        
        return data
    }

    inserir(tabela, data) {
        if(Array.isArray(this.#database[tabela])) { //checa a existência de um array com o tarefa inserido
            this.#database[tabela].push(data) //caso exista, adiciona informação nele
        } else {    //caso não exista
            this.#database[tabela] = [data] // Cria um array novo na database caso este não exista
        }
        this.#persist()
        return data
    }

    deletar(tabela, id) {
        const procurarindex = this.#database[tabela].findIndex(procurar => procurar.id === id)

        if(procurarindex > -1) {
            this.#database[tabela].splice(procurarindex, 1)
            this.#persist()
        } else {
            console.log("Tarefa não existente")
        }
    }

    atualizar(tabela, id, data) {
        const procurarindex = this.#database[tabela].findIndex(procurar => procurar.id === id)

        if(procurarindex > -1) {
            this.#database[tabela][procurarindex] = {...this.#database[tabela][procurarindex], ...data, id}
            
            this.#persist()
        }
    }

    patchar(tabela, id, data) {
        const procurarindex = this.#database[tabela].findIndex(procurar => procurar.id === id)

        if(procurarindex > -1) {
            this.#database[tabela][procurarindex] = {...this.#database[tabela][procurarindex], ...data, id}
            
            this.#persist()
        } else {
            return console.log("Tarefa não existente")
        }
    }


}