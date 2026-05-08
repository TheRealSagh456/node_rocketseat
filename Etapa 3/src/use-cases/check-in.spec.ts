import {expect, describe, it, beforeEach, afterEach, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'
import { MaxDistanceError } from './errors/max-distance-error.js'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository = new InMemoryGymsRepository()

describe('Check-in Use Case',() => {
    beforeEach(async () => {
        CheckInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(CheckInsRepository as any, gymsRepository)
    



        await gymsRepository.create({
            id: 'gym-01',
            title: 'Node gym',
            description: '',
            phone: "",
            latitude: 0,
            longitude: 0
        })

        vi.useFakeTimers()

    })

    afterEach(() => {

        vi.useRealTimers()
    })
    
    it('should be able to check in', async () => {


        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))
        
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(checkIn.id).toEqual(expect.any(String))

    })

     it('should not be able to check in twice in a day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))

        
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })
        
        await expect( async () => {
            await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })}).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))

        
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0 ,0))

        
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gyms', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Node gym',
            description: '',
            phone: "",
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672)
        })


        await expect(async () => {
            
            await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.0747279,
            userLongitude: -49.4889672
        
        })
        }).rejects.toBeInstanceOf(MaxDistanceError)

    })
})