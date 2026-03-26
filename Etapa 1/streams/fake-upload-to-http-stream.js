//Node suporta a fetch API, que é usada para tratar de requisições web
import { Readable } from 'node:stream'

class umpra100stream extends Readable {
    index = 1
    _read() {
        const i = this.index++

       setTimeout(() => {
         if (i > 5) {
            this.push(null)
        }
        else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
       }, 1000)
    }
}

fetch('http://localhost:3335', {
    method: 'POST',
    body: new umpra100stream(),
    duplex: 'half'
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})