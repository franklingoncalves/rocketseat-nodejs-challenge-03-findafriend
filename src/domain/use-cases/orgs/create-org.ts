import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@/domain/entities/org'
import { OrgAlreadyExistsError } from '@/domain/erros'

interface CreateOrgUseCaseRequest {
  name: string
  city: string
  email: string
  password: string
  whatsapp: string
  address: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    city,
    email,
    password,
    whatsapp,
    address,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = new Org({ name, city, email, password, whatsapp, address })

    await this.orgsRepository.create(org)

    return { org }
  }
}
