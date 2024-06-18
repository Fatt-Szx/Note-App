import { selector } from 'recoil'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'

export const uncompletedTasksSelector = selector<Task[]>({
  key: 'uncompleted_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder !== 4
    })
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: 'completed_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4
    })
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: 'inProgressTasksSelector',
  get: ({ get }) => { 
    return get(tasksState).filter((task) => {
      return task.progressOrder === 3
    })
  },
})


export const waitingTasksSelector = selector<Task[]>({
  key: 'waitingTasksSelector',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 2
    })
  },
})

export const notStartedTasksSelector = selector<Task[]>({
  key: 'notStartedTasksSelector',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 1
    })
  },
})