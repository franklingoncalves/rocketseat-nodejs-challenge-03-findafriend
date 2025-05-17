import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { Org } from '@/domain/entities/org'
import { Pet, PetAge, PetSize } from '@/domain/entities/pet'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memoty-pets-repository'
import { ListAvailablePetsUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: ListAvailablePetsUseCase

describe('List Available Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new ListAvailablePetsUseCase(petsRepository)

    const org = new Org({
      name: 'Test Org',
      email: 'org@example.com',
      password: 'hashed',
      whatsapp: '123456789',
      city: 'Test City',
      address: '123 Street',
    })

    await orgsRepository.create(org)

    const pet1 = new Pet({
      name: 'Rex',
      description: 'Friendly dog',
      age: PetAge.YOUNG,
      size: PetSize.MEDIUM,
      energyLevel: 4,
      independencyLevel: 3,
      environment: PetSize.MEDIUM,
      orgId: org.id,
    })

    await petsRepository.create(pet1)

    const pet2 = new Pet({
      name: 'Harry',
      description: 'Friendly dog',
      age: PetAge.ADULT,
      size: PetSize.LARGE,
      energyLevel: 4,
      independencyLevel: 3,
      environment: PetSize.LARGE,
      orgId: 'org-id-2',
    })

    await petsRepository.create(pet2)    
  })

  it('should list pets by city', async () => {
    const { pets } = await sut.execute({ city: 'Test City' })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Rex')
  })

  it('should filter pets by age', async () => {
    const { pets } = await sut.execute({ city: 'Test City', filters: { age: PetAge.YOUNG } })

    expect(pets).toHaveLength(1)
    expect(pets[0].age).toBe(PetAge.YOUNG)
  })
})
