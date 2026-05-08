import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { CreateGymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case',() => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    
    it('should be able to register', async () => {
        

        const {gym} = await sut.execute({
            title: 'Academia Bom-de-Código',
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await expect(gym.id).toEqual(expect.any(String))
    })
})