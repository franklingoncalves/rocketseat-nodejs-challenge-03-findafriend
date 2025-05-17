import { PetsRepository, PetFilters } from '@/domain/repositories/pets-repository'
import { Pet } from '@/domain/entities/pet'

interface ListAvailablePetsUseCaseRequest {
  city: string
  filters?: PetFilters
}

interface ListAvailablePetsUseCaseResponse {
  pets: Pet[]
}

export class ListAvailablePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filters,
  }: ListAvailablePetsUseCaseRequest): Promise<ListAvailablePetsUseCaseResponse> {
    const pets = await this.petsRepository.listAvailablePetsByCity(city, filters)
    return { pets }
  }
}
