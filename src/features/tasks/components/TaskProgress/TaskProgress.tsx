import { useRecoilValue } from 'recoil';
import { notStartedTasksSelector, inProgressTasksSelector, waitingTasksSelector, completedTasksSelector } from '../../TaskSelectors';
import TaskColumn from './TaskColumn';
import type { Task, CSSProperties } from '../../../../types';
import { TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '../../../../constants/app';

const TaskProgress = (): JSX.Element => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksSelector);
  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksSelector);
  const waitingTasks: Task[] = useRecoilValue(waitingTasksSelector);
  const completedTasks: Task[] = useRecoilValue(completedTasksSelector);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Progress</h1>
      <div style={styles.taskCategories}>
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.NOT_STARTED}
          tasks={notStartedTasks}
          progressOrder={TASK_PROGRESS_ID.NOT_STARTED} // Menambahkan progressOrder
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.IN_PROGRESS}
          tasks={inProgressTasks}
          progressOrder={TASK_PROGRESS_ID.IN_PROGRESS} // Menambahkan progressOrder
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.WAITING}
          tasks={waitingTasks}
          progressOrder={TASK_PROGRESS_ID.WAITING} // Menambahkan progressOrder
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.COMPLETED}
          tasks={completedTasks}
          progressOrder={TASK_PROGRESS_ID.COMPLETED} // Menambahkan progressOrder
        />
      </div>
    </div>
  );
};

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskCategories: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

export default TaskProgress;
