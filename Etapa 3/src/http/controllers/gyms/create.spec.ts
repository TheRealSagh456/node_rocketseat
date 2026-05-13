import request from 'supertest'
import {app} from '../../../app.js'
import {afterAll, beforeAll, describe, expect, it} from 'vitest'
import { createAndAuthenticateUser } from '../../../use-cases/utils/test/create-and-authenticate-user.js'

describe('Create Gym (e2e)', () => {
        
    beforeAll(async () => {
            await app.ready()
        })
    
    afterAll(async () => {
            await app.close()
        })
    
    it('should be able to create a gym', async () => {

        const {token} = await createAndAuthenticateUser(app, true)
        
        const response = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'My hero Academia',
            description: 'Plus Ultra',
            phone: '1',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        expect(response.statusCode).toEqual(201)
    }) 

})

