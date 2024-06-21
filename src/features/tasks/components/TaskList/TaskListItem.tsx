import React, { useState } from 'react';
import { useTasksAction } from '../hooks/Tasks'; // Pastikan ini diimpor dari lokasi yang tepat
import TaskMenu from '../shared/TaskMenu'; // Pastikan ini diimpor jika digunakan
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '../../../../constants/app'; // Pastikan ini diimpor dari lokasi yang tepat
import type { Task, CSSProperties } from '../../../../types'; // Pastikan ini diimpor dari lokasi yang tepat
import TaskModal from '../shared/TaskModal';

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5';

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer';

  return {
    color,
    cursor,
    fontSize: '28px',
    marginRight: '6px',
  };
};

const getProgressCategory = (progressOrder: number): string => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return TASK_PROGRESS_STATUS.NOT_STARTED;
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return TASK_PROGRESS_STATUS.IN_PROGRESS;
    case TASK_PROGRESS_ID.WAITING:
      return TASK_PROGRESS_STATUS.WAITING;
    case TASK_PROGRESS_ID.COMPLETED:
      return TASK_PROGRESS_STATUS.COMPLETED;
    default:
      return TASK_PROGRESS_STATUS.NOT_STARTED;
  }
};

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  const { completeTask, deleteTask, editTask } = useTasksAction();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleCompleteTask = () => {
    completeTask(task.id); // Memanggil completeTask saat ikon task selesai diklik
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
    <div style={styles.tableBody} data-testid="task-list-item">
      <div style={styles.tableBodyTaskTitle}>
        <span
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={handleCompleteTask} // Menghubungkan handleCompleteTask dengan onClick
        >
          check_circle
        </span>
        {task.title}
      </div>
      <div style={styles.tableBodyDetail}>{task.detail}</div>
      <div style={styles.tableBodyDueDate}>{task.dueDate}</div>
      <div style={styles.tableBodyprogress}>
        {getProgressCategory(task.progressOrder)}
      </div>
      <div>
        <span
        className="material-icons"
        style={styles.menuIcon}
        onClick={(): void => setIsMenuOpen(true)} data-testid="task-menu-button"
      >
          more_horiz
        </span>
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
  tableBody: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #D8D8D8',
    fontSize: '20px',
    position: 'relative',
  },
  tableBodyTaskTitle: {
    width: '15%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    overflowWrap: 'anywhere',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDetail: {
    width: '30%',
    padding: '16px',
    overflowWrap: 'anywhere',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDueDate: {
    width: '10%',
    padding: '16px',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyprogress: {
    width: '15%',
    padding: '16px',
  },
  menuIcon: {
    cursor: 'pointer',
  },
};

export default TaskListItem;
