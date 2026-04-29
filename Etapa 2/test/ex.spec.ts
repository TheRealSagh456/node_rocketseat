import {test, beforeAll, afterAll, describe, expect, beforeEach} from 'vitest'
import {app} from '../src/app.js'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Transactions Routes', () => {

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

beforeEach(()=> {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
})

test("Usuario consegue criar nova transação", async () => {
    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
    })
    .expect(201)

})

test('Usuário consegue ver transições feitas por ele', async () => {
    
    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
    })

    const cookie = String(response.get('Set-Cookie'))

    const listagem = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookie)
    .expect(200)

    expect(listagem.body.transactions)
    .toEqual([expect
        .objectContaining({
        title: 'New transaction',
        amount: 5000,
    })
])
})

test('Usuário consegue ver transições especificas', async () => {
    
    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
    })

    
    const cookie = String(response.get('Set-Cookie'))


    const list = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookie)
    .expect(200)

    const transactionid = list.body.transactions[0].id

    const getresponse = await request(app.server)
    .get(`/transactions/${transactionid}`)
    .set('Cookie', cookie)
    .expect(200)

    expect(getresponse.body.transaction)
    .toEqual(expect
        .objectContaining({
        title: 'New transaction',
        amount: 5000,
    })
)
})

test('Usuário consegue ver a soma de todas as transições feitas por ele', async () => {
    
    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit'
    })

    const cookie = String(response.get('Set-Cookie'))

    await request(app.server)
    .post('/transactions')
    .set('Cookie', cookie)
    .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit'
    })

    const summary = await request(app.server)
    .get('/transactions/summary')
    .set('Cookie', cookie)
    .expect(200)

    expect(summary.body.summary)
    .toEqual({
        amount: 3000,
})
})

})

