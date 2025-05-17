import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memoty-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { Org } from '@/domain/entities/org'
import { PetAge, PetSize } from '@/domain/entities/pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = new Org({
      name: 'Org 1',
      email: 'org1@example.com',
      password: 'hash',
      whatsapp: '123456789',
      city: 'Test City',
      address: 'Test Address',
    })

    await orgsRepository.create(org)

    const { pet } = await sut.execute({
      name: 'Tobby',
      description: 'Energetic dog',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: 5,
      independencyLevel: 3,
      environment: PetSize.SMALL,
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
