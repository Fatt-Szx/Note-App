// components/TaskColumn.tsx
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from '../shared/TaskModal';
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app';
import type { Task } from '../../../../types';

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  progressOrder: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, progressOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
        <button style={styles.button} onClick={handleOpenModal}>
          <span className="material-icons">add</span>
        </button>
      </div>
      <div>
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle={`Add ${columnTitle} Task`}
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
    </div>
  );
};

const styles = {
  categoryColumn: {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  categoryTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0',
  },
  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    outline: 'none',
  },
};

export default TaskColumn;