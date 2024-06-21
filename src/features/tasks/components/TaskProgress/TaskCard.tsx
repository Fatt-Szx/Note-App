import React, { useState } from 'react';
import type { Task, CSSProperties } from '../../../../types';
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app';
import { useTasksAction } from '../../components/hooks/Tasks';
import TaskModal from '../shared/TaskModal';
import TaskMenu from '../shared/TaskMenu'; // Pastikan diimpor

interface TaskCardProps {
  task: Task;
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5';

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer';

  return {
    color,
    cursor,
    fontSize: '28px',
  };
};

const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
  const justifyContentValue: 'flex-end' | 'space-between' =
    progressOrder === TASK_PROGRESS_ID.NOT_STARTED
      ? 'flex-end'
      : 'space-between';
  return {
    display: 'flex',
    justifyContent: justifyContentValue,
  };
};

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { moveTaskCard, completeTask, deleteTask, editTask } = useTasksAction();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleCompleteTask = () => {
    completeTask(task.id);
  };

  const handleEdit = (): void => {
    setIsEditModalOpen(true);
  };

  const handleDelete = (): void => {
    deleteTask(task.id);
    setIsMenuOpen(false);
  };

  const handleSaveEdit = (updatedTask: Partial<Task>): void => {
    editTask(task.id, updatedTask);
    setIsEditModalOpen(false);
  };

  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={handleCompleteTask}
        >
          check_circle
        </div>
        <div>
          <span
            className="material-icons"
            style={styles.menuIcon}
            onClick={(): void => setIsMenuOpen(true)} data-testid="task-menu-button"
          >
            more_vert
          </span>
        </div>
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons"
            onClick={(): void => moveTaskCard(task.id, 'left')}
          >
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons"
            onClick={(): void => moveTaskCard(task.id, 'right')}
          >
            chevron_right
          </button>
        )}
      </div>
      {isMenuOpen && (
        <TaskMenu
          setIsMenuOpen={setIsMenuOpen}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {isEditModalOpen && (
        <TaskModal
          headingTitle={`Edit Task`}
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsEditModalOpen}
          defaultProgressOrder={task.progressOrder}
          task={task}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default TaskCard;
