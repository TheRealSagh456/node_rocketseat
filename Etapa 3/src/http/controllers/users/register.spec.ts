import request from 'supertest'
import {app} from '../../../app.js'
import {afterAll, beforeAll, describe, expect, it} from 'vitest'

describe('Register (2e2)', () => {
        
    beforeAll(async () => {
            await app.ready()
        })
    
    afterAll(async () => {
            await app.close()
        })
    
    it('should be able to register', async () => {

        const response = await request(app.server).post('/users').send({
        name: 'Fallenzão',
        email: 'respeita@overdadeiro.com',
        password: 'stopblowingmymind'
    })

        expect(response.statusCode).toEqual(201)
    })
})