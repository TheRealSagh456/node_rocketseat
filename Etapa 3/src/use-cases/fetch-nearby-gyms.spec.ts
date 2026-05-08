import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case',() => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })
    
    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.0692052,
            longitude: -49.5201091,
        })
        
        const {gyms} = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        await expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym'})
        ])

    })
})