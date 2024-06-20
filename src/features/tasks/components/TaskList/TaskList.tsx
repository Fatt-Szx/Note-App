import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, filterState } from '../../../../state/globalState';
import { tasksState } from '../../TaskAtoms';
import TaskListItem from './TaskListItem';
import TaskModal from '../shared/TaskModal';
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app';
import type { Task, CSSProperties } from '../../../../types';
import React from 'react';

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState);
  const [modal, setModal] = useRecoilState(modalState);
  const [filter, setFilter] = useRecoilState(filterState);

  const openModal = () => {
    setModal({ isOpen: true, modalType: TASK_MODAL_TYPE.ADD, taskId: null });
  };

  const closeModal = () => {
    setModal({ isOpen: false, modalType: null, taskId: null });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, progress: event.target.value });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter.progress === 'all') return true;
    if (filter.progress === 'completed') return task.progressOrder === TASK_PROGRESS_ID.COMPLETED;
    if (filter.progress === 'inProgress') return task.progressOrder === TASK_PROGRESS_ID.IN_PROGRESS;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button
          style={styles.button}
          onClick={openModal}
        >
          <span className="material-icons">add</span>Add task
        </button>
        <div style={{ position: 'relative', display: 'inline-block' }}>
  <select style={styles.select} value={filter.progress} onChange={handleFilterChange}>
    <option style={styles.option} value="all">All</option>
    <option style={styles.option} value="completed">Completed</option>
    <option style={styles.option} value="inProgress">In Progress</option>
  </select>
  <span className="material-icons">sort</span>
</div>

      </div>
      <div>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderTaskName}>Task Name</div>
          <div style={styles.tableHeaderDetail}>Detail</div>
          <div style={styles.tableHeaderDueDate}>Due Date</div>
          <div style={styles.tableHeaderProgress}>Progress</div>
        </div>
        {filteredTasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {modal.isOpen && modal.modalType === TASK_MODAL_TYPE.ADD && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={closeModal}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
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
  taskButtons: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    marginRight: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    padding: '19px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 10px',
  },
  option : {
    fontSize: '24px',
  },
  tableHead: {
    display: 'flex',
    fontSize: '24px',
    borderBottom: '1px solid #D8D8D8',
  },
  tableHeaderTaskName: {
    padding: '16px',
    width: '15%',
  },
  tableHeaderDetail: {
    padding: '16px',
    width: '30%',
  },
  tableHeaderDueDate: {
    padding: '16px',
    width: '10%',
  },
  tableHeaderProgress: {
    padding: '16px',
    width: '15%',
  },
};

export default TaskList;
