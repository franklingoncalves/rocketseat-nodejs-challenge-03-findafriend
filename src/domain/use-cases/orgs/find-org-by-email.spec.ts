import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { FindOrgByEmailUseCase } from './find-org-by-email'
import { Org } from '@/domain/entities/org'

let orgsRepository: InMemoryOrgsRepository
let sut: FindOrgByEmailUseCase

describe('Find Org By Email Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindOrgByEmailUseCase(orgsRepository)
  })

  it('should return an org if email exists', async () => {
    const org = new Org({
      name: 'Test Org',
      city: 'Test City',
      email: 'test@example.com',
      password: 'hash',
      address: '123 St',
      whatsapp: '999999999',
    })

    await orgsRepository.create(org)

    const { org: foundOrg } = await sut.execute({ email: 'test@example.com' })

    expect(foundOrg).toEqual(org)
  })

  it('should return null if email does not exist', async () => {
    const { org } = await sut.execute({ email: 'nonexistent@example.com' })

    expect(org).toBeNull()
  })
})
