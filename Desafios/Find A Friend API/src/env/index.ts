import dotenv from 'dotenv'
import {z} from 'zod'

dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string()
})

const _env = envSchema.parse(process.env)

if(!_env) {
    throw new Error('Deu ruim pae')
}

export const env = _env