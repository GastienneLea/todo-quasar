import { Channel } from '@anycable/web';
import { Tasks } from 'src/types'

type params = { companyId: string }

export class todoChannel extends Channel<params> {
  static identifier = 'todoChannel'

  async createTodo(task: Tasks) {
    return this.perform('createTodo', task)
  }
}
