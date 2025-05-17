import { Pet, PetAge, PetSize } from '@/domain/entities/pet'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: PetAge
  size: PetSize
  energyLevel: number
  independencyLevel: number
  environment: PetSize
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independencyLevel,
    environment,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = new Pet({
      name,
      description,
      age,
      size,
      energyLevel,
      independencyLevel,
      environment,
      orgId,
    })

    await this.petsRepository.create(pet)

    return { pet }
  }
}
