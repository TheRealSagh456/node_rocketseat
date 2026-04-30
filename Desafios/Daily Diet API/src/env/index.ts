import {z} from 'zod'
import 'dotenv/config'

const envSCHEMA = z.object({
    NODE_ENV: z.enum(["development","test","production"]).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSCHEMA.safeParse(process.env)

if(_env.success === false) {
    console.error('⚠️ Variáveis de ambiente inválidas!', _env.error.format())

    throw new Error('Variáveis de ambiente inválidas.')
}

export const env = _env.data