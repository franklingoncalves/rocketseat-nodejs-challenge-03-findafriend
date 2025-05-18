import { Pet } from '@/domain/entities/pet'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface FindPetByIdUseCaseRequest {
  id: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet | null
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    return { pet }
  }
}
