export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Org already exists with this email')
    this.name = 'OrgAlreadyExistsError'
  }
}
