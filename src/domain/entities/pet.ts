import { randomUUID } from 'node:crypto'

export enum PetAge {
  PUPPY = 'puppy',
  YOUNG = 'young',
  ADULT = 'adult',
  SENIOR = 'senior',
}

export enum PetSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export class Pet {
  public readonly id: string
  public orgId: string
  public name: string
  public description?: string
  public age: PetAge
  public size: PetSize
  public energyLevel: number
  public independencyLevel: number
  public environment: PetSize
  public photos: string[]

  constructor(props: Omit<Pet, 'id'>, id?: string) {
    this.id = id ?? randomUUID()
    this.orgId = props.orgId
    this.name = props.name
    this.description = props.description
    this.age = props.age
    this.size = props.size
    this.energyLevel = props.energyLevel
    this.independencyLevel = props.independencyLevel
    this.environment = props.environment
    this.photos = props.photos ?? []
  }
}
