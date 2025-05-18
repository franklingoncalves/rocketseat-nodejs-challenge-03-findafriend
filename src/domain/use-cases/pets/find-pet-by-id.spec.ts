import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memoty-pets-repository'
import { FindPetByIdUseCase } from './find-pet-by-id'
import { Pet, PetAge, PetSize } from '@/domain/entities/pet'
import { Org } from '@/domain/entities/org'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FindPetByIdUseCase

describe('Find Pet By ID Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FindPetByIdUseCase(petsRepository)
  })

  it('should return a pet if id exists', async () => {
    const org = new Org({
      name: 'Org Test',
      email: 'test@example.com',
      password: 'hash',
      address: 'Rua Teste',
      whatsapp: '999999999',
      city: 'Test City',
    })

    await orgsRepository.create(org)

    const pet = new Pet({
      name: 'Rex',
      description: 'Cachorro legal',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: 5,
      independencyLevel: 2,
      environment: PetSize.SMALL,
      orgId: org.id,
      photos: [],
    })

    await petsRepository.create(pet)

    const { pet: foundPet } = await sut.execute({ id: pet.id })

    expect(foundPet).toEqual(pet)
  })

  it('should return null if pet does not exist', async () => {
    const { pet } = await sut.execute({ id: 'non-existent' })

    expect(pet).toBeNull()
  })
})
