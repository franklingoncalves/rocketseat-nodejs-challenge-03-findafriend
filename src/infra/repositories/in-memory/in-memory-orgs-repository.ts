import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@/domain/entities/org'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(org: Org): Promise<void> {
    this.items.push(org)
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email)
    return org ?? null
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((org) => org.id === id)
    return org ?? null
  }
}
