import { Org } from '@/domain/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

interface FindOrgByEmailUseCaseRequest {
  email: string
}

interface FindOrgByEmailUseCaseResponse {
  org: Org | null
}

export class FindOrgByEmailUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
  }: FindOrgByEmailUseCaseRequest): Promise<FindOrgByEmailUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    return {
      org,
    }
  }
}
