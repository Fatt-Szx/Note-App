import React from 'react';
import TaskColumn from './TaskColumn';
import { TASK_PROGRESS_ID } from '../../../../constants/app';
import type { Task } from '../../../../types';

const tasks: Task[] = [
  // Daftar tugas Anda, misalnya:
  { id: 1, title: 'Task 1', description: 'Description of Task 1', progress: TASK_PROGRESS_ID.NOT_STARTED },
  { id: 2, title: 'Task 2', description: 'Description of Task 2', progress: TASK_PROGRESS_ID.IN_PROGRESS },
  { id: 3, title: 'Task 3', description: 'Description of Task 3', progress: TASK_PROGRESS_ID.WAITING },
  { id: 4, title: 'Task 4', description: 'Description of Task 4', progress: TASK_PROGRESS_ID.COMPLETED },
];

const Board = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <TaskColumn columnTitle="Not Started" tasks={tasks.filter(task => task.progress === TASK_PROGRESS_ID.NOT_STARTED)} progressOrder={TASK_PROGRESS_ID.NOT_STARTED} />
    <TaskColumn columnTitle="In Progress" tasks={tasks.filter(task => task.progress === TASK_PROGRESS_ID.IN_PROGRESS)} progressOrder={TASK_PROGRESS_ID.IN_PROGRESS} />
    <TaskColumn columnTitle="Waiting" tasks={tasks.filter(task => task.progress === TASK_PROGRESS_ID.WAITING)} progressOrder={TASK_PROGRESS_ID.WAITING} />
    <TaskColumn columnTitle="Completed" tasks={tasks.filter(task => task.progress === TASK_PROGRESS_ID.COMPLETED)} progressOrder={TASK_PROGRESS_ID.COMPLETED} />
  </div>
);

export default Board;
