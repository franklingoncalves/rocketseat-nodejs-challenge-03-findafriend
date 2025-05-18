import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { FindOrgByIdUseCase } from './find-org-by-id'
import { Org } from '@/domain/entities/org'

let orgsRepository: InMemoryOrgsRepository
let sut: FindOrgByIdUseCase

describe('Find Org By ID Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindOrgByIdUseCase(orgsRepository)
  })

  it('should return an org if id exists', async () => {
    const org = new Org({
      name: 'Org 1',
      city: 'Test 1',
      email: 'org1@example.com',
      password: 'hash',
      whatsapp: '123456789',
      address: 'Test Address',
    })

    await orgsRepository.create(org)

    const { org: foundOrg } = await sut.execute({ id: org.id })

    expect(foundOrg).toEqual(org)
  })

  it('should return null if org with given id does not exist', async () => {
    const { org } = await sut.execute({ id: 'nonexistent-id' })

    expect(org).toBeNull()
  })
})
