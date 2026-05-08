import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case',() => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })
    
    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: 'JS gym',
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'TS gym',
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })
        
        const {gyms} = await sut.execute({
            query:'JS',
            page: 1
        })

        await expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'JS gym'})
        ])

    })

    it('should be able to fetch paginated gyms search', async () => {

        for( let i = 1; i <= 22; i++) {
            await gymsRepository.create({
            title: `TS gym ${i}`,
            description: 'Code até a falha',
            phone: '4002-8922',
            latitude: -27.2092052,
            longitude: -49.6401091,
            })
        }
        const {gyms} = await sut.execute({
            query: 'TS',
            page: 2
        })

        await expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'TS gym 21'}),
            expect.objectContaining({title: 'TS gym 22'}),
        ])

    })
})