import type { Knex } from "knex"
import knex from 'knex'
import {env} from './src/env/index'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const knecs = knex(config)
export default config