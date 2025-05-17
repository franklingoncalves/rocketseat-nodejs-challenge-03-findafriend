import { Pet } from '@/domain/entities/pet'
import { PetsRepository, PetFilters } from '@/domain/repositories/pets-repository'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: OrgsRepository) {}

  async create(pet: Pet): Promise<void> {
    this.items.push(pet)
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)
    return pet ?? null
  }

  async listAvailablePetsByCity(city: string, filters?: PetFilters): Promise<Pet[]> {
    const orgsInCity = await this.orgsRepository.findByCity(city)
    const orgIdsInCity = orgsInCity.map((org) => org.id)

    let pets = this.items.filter((pet) => orgIdsInCity.includes(pet.orgId))

    if (filters) {
      if (filters.age) {
        pets = pets.filter(pet => pet.age === filters.age)
      }
      if (filters.size) {
        pets = pets.filter(pet => pet.size === filters.size)
      }
      if (filters.energyLevel) {
        pets = pets.filter(pet => pet.energyLevel === filters.energyLevel)
      }
      if (filters.independencyLevel) {
        pets = pets.filter(pet => pet.independencyLevel === filters.independencyLevel)
      }
      if (filters.environment) {
        pets = pets.filter(pet => pet.environment === filters.environment)
      }
    }

    return pets
  }
}
