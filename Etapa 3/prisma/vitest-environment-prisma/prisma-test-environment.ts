import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type {Environment} from 'vitest/environments'
import { prisma } from '../../src/lib/prisma.js'
import fs from 'node:fs'

function generateDatabaseUrl(databaseFile: string) {
  return `file:./src/db/${databaseFile}`
}

export default <Environment>{
    name: 'prisma',
    viteEnvironment: 'ssr',

//     async setup() {
//         //Começa o processo
    
//         const schema = randomUUID()
//         const databaseUrl = generateDatabaseUrl(schema)

//         console.log(databaseUrl)
        
//         process.env.DATABASE_URL = databaseUrl

//         execSync('npax prisma migrate deploy')
        
//         return {
//         async teardown() {
//             //Termina o processo

//             await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema} CASCADE"`)
            
//             await prisma.$disconnect()
//         }
//     }
//     }
// }

//Para o SQLITE:

async setup() {
    const databaseFile = `${randomUUID()}.db`

    const databaseUrl = generateDatabaseUrl(databaseFile)

    process.env.DATABASE_URL = databaseUrl

    console.log(databaseUrl)

    execSync('npx prisma db push', {
      stdio: 'inherit',
    })

    return {
      async teardown() {
        await prisma.$disconnect()

        const dbPath = `./prisma/${databaseFile}`

        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath)
        }
      },
    }
  },
}
//Na criação do banco de dados de testes ele usa a feature schema do postgrees para criar tabelas e apagar tabelas 