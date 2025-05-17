import { randomUUID } from 'crypto';

export interface OrgProps {
  name: string
  email: string
  password: string
  whatsapp: string
  address: string
  createdAt?: Date
}

export class Org {
  private _id: string
  private props: OrgProps

  constructor(props: OrgProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get whatsapp(): string {
    return this.props.whatsapp
  }

  get address(): string {
    return this.props.address
  }

  get createdAt(): Date {
    return this.props.createdAt!
  }
}
