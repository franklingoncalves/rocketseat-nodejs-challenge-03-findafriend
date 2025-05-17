import { Pet, PetAge, PetSize } from '@/domain/entities/pet'

export interface PetFilters {
  age?: PetAge
  size?: PetSize
  energyLevel?: number
  independencyLevel?: number
  environment?: PetSize
}

export interface PetsRepository {
  create(pet: Pet): Promise<void>
  findById(id: string): Promise<Pet | null>
  
  listAvailablePetsByCity(city: string, filters?: PetFilters): Promise<Pet[]>
}
