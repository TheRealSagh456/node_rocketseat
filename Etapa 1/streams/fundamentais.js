// Processo do node
//stdin e stdout (o que é digitado no terminal)
//stdin retorna o que for escrito no terminal
//process.stdin
//.pipe(process.stdout)
//buffer é o formato necessário para se trabalhar com node

import Stream, { Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

       setTimeout(() => {
         if (i > 100) {
            this.push(null)
        }
        else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
       }, 1000)
    }
}

class inverternumerostream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformado = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformado)))
    }
}

class Multiplicandopor10stream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString())*10)
        callback()
    }
} 
new OneToHundredStream()
    .pipe(new inverternumerostream())
    .pipe(new Multiplicandopor10stream())

// O OneTO100Stream retorna números de 1 a 100 em intervalos
// Multiplicandopo10stream multiplica todos os números por 10, fazendo a contagem se tornar de 10 a 1000
// inverternumerostream multiplica os números do OneTO100Stream por -1 tornando-os negativos