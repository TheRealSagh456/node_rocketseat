import request from 'supertest'
import {app} from '../../../app.js'
import {afterAll, beforeAll, describe, expect, it} from 'vitest'

describe('Profile (2e2)', () => {
        
    beforeAll(async () => {
            await app.ready()
        })
    
    afterAll(async () => {
            await app.close()
        })
    
    it('should be able to get user profile', async () => {

        await request(app.server).post('/users').send({
        name: 'Fallenzão',
        email: 'respeita@overdadeiro.com',
        password: 'stopblowingmymind'
    })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'respeita@overdadeiro.com',
            password: 'stopblowingmymind'
        })

        const {token} = authResponse.body
        
        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'respeita@overdadeiro.com',     
            })
        )
    }) 

})





        
