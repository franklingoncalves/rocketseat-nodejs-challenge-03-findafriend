import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '@/domain/erros'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      name: 'Animal Rescue',
      email: 'org@example.com',
      password: '123456',
      whatsapp: '123456789',
      address: '123 Street, City',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not allow to create two orgs with the same email', async () => {
    const email = 'org@example.com'

    await sut.execute({
      name: 'Org 1',
      email,
      password: '123456',
      whatsapp: '123456789',
      address: 'Street 1',
    })

    await expect(() =>
      sut.execute({
        name: 'Org 2',
        email,
        password: 'abcdef',
        whatsapp: '99999999',
        address: 'Street 2',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
