import { useRecoilState } from 'recoil';
import { tasksState } from '../../TaskAtoms';
import type { Task } from '../../../../types';
import { TASK_PROGRESS_ID } from '../../../../constants/app';

export const useTasksAction = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  // Helper function to generate a unique ID
  const generateUniqueId = () => {
    return tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  };

  const addTask = (title: string, detail: string, dueDate: string, progressOrder: number): void => {
    const newTask: Task = {
      id: generateUniqueId(),
      title,
      detail,
      dueDate,
      progressOrder,
    };
    console.log('Adding new task:', newTask);
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const editTask = (id: number, updatedTask: Partial<Task>): void => {
    console.log('editTask called with:', id, updatedTask);
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === id) {
          console.log('Updating task:', task);
          return { ...task, ...updatedTask };
        }
        return task;
      });
      console.log('Updated tasks:', updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id: number): void => {
    console.log('Deleting task with id:', id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const completeTask = (id: number): void => {
    console.log('Completing task with id:', id);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task
      )
    );
  };

  const moveTaskCard = (id: number, direction: 'left' | 'right'): void => {
    console.log('Moving task with id:', id, 'direction:', direction);
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          const newProgressOrder =
            direction === 'left'
              ? task.progressOrder - 1
              : task.progressOrder + 1;
          return { ...task, progressOrder: newProgressOrder };
        }
        return task;
      })
    );
  };

  return {
    addTask,
    editTask,
    deleteTask,
    completeTask,
    moveTaskCard,
  };
};
