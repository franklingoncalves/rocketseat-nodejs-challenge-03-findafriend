export class MissingOrgInfoError extends Error {
    constructor() {
        super('Org must have address and whatsapp number')
        this.name = 'MissingOrgInfoError'
    }
}