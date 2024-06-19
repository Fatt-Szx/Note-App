import { useRecoilState } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import type { Task } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
}

export const useTasksAction = () => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const moveTaskCard = (taskId: number, direction: 'left' | 'right'): void => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newProgressOrder =
          direction === 'left'
            ? task.progressOrder - 1
            : task.progressOrder + 1
        return { ...task, progressOrder: newProgressOrder }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task
    )
    setTasks(updatedTasks)
  }

  return {
    moveTaskCard,
    completeTask,
  }
}