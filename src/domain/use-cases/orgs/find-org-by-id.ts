import { Org } from '@/domain/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

interface FindOrgByIdUseCaseRequest {
  id: string
}

interface FindOrgByIdUseCaseResponse {
  org: Org | null
}

export class FindOrgByIdUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id,
  }: FindOrgByIdUseCaseRequest): Promise<FindOrgByIdUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    return {
      org,
    }
  }
}
