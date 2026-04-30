import fs from 'node:fs'
import {parse} from 'csv-parse'

const pathcsv = new URL('./tasks.csv', import.meta.url)

async function rodar() {
    const stream = fs.createReadStream(pathcsv)

    const parsecsv = stream.pipe(parse({
        delimiter: ',',
        skipEmptyLines: true,
        fromLine: 2
    }));

    for await (const line of parsecsv) {
        const [titulo, descricao] = line

        await fetch('http://localhost:3334/tarefas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                tarefa: titulo,
                descrição: descricao
            })   
        })
        console.log(`Importado: ${titulo}`);
    }
}

rodar()