import React from 'react';
import { useRecoilState } from 'recoil';
import { useTasksAction } from '../hooks/Tasks';
import TaskMenu from '../shared/TaskMenu';
import TaskModal from '../shared/TaskModal';
import { modalState, menuState } from '../../../../state/globalState';
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '../../../../constants/app';
import type { Task, CSSProperties } from '../../../../types';

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color = progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5';
  const cursor = progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer';
  return { color, cursor, fontSize: '28px', marginRight: '6px' };
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
  const [modal, setModal] = useRecoilState(modalState);
  const [menu, setMenu] = useRecoilState(menuState);

  const handleCompleteTask = () => completeTask(task.id);

  const handleMenuOpen = () => {
    setMenu({ isOpen: true, taskId: task.id });
  };

  const handleEdit = (): void => {
    setModal({ isOpen: true, modalType: TASK_MODAL_TYPE.EDIT, taskId: task.id });
    setMenu({ isOpen: false, taskId: null });
  };

  const handleDelete = (): void => {
    deleteTask(task.id);
    setMenu({ isOpen: false, taskId: null });
  };

  const handleSaveEdit = (updatedTask: Partial<Task>): void => {
    editTask(task.id, updatedTask);
    setModal({ isOpen: false, modalType: null, taskId: null });
  };

  return (
    <div style={styles.tableBody}>
      <div style={styles.tableBodyTaskTitle}>
        <span
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={handleCompleteTask}
        >
          check_circle
        </span>
        {task.title}
      </div>
      <div style={styles.tableBodyDetail}>{task.detail}</div>
      <div style={styles.tableBodyDueDate}>{task.dueDate}</div>
      <div style={styles.tableBodyprogress}>{getProgressCategory(task.progressOrder)}</div>
      <div>
        <span className="material-icons" style={styles.menuIcon} onClick={handleMenuOpen}>
          more_horiz
        </span>
      </div>
      {menu.isOpen && menu.taskId === task.id && (
        <TaskMenu
          setIsMenuOpen={() => setMenu({ isOpen: false, taskId: null })}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {modal.isOpen && modal.taskId === task.id && modal.modalType === TASK_MODAL_TYPE.EDIT && (
        <TaskModal
          headingTitle="Edit Task"
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={() => setModal({ isOpen: false, modalType: null, taskId: null })}
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
