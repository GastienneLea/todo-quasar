import { Model, Attr, HasMany, BelongsTo, SpraypaintBase } from 'spraypaint'

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static baseUrl = 'http://localhost:3000/'
  static apiNamespace = 'api/v1'

  static generateAuthHeader(token: string) {
    return `Bearer ${token}`
  }
}

@Model()
export class Task extends ApplicationRecord {

  @Attr() title: string
  @Attr isCompleted: boolean
  @Attr() dueAt: Date
  @Attr() details: string
  @Attr({ persist: false }) createdAt: string
  @Attr({ persist: false }) updatedAt: string

 @BelongsTo() user: User
}

@Model()
export class User extends ApplicationRecord {

  @Attr() username: string
  @Attr({ persist: false }) createdAt: string
  @Attr({ persist: false }) updatedAt: string

  @HasMany() tasks: Task[]
}
