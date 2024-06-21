import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  TASK_PROGRESS_ID,
  TASK_PROGRESS_STATUS,
  TASK_MODAL_TYPE,
} from '../../../../constants/app';
import type { CSSProperties, Task } from '../../../../types';
import { useTasksAction } from '../hooks/Tasks';

interface TaskFormProps {
  type: string;
  defaultProgressOrder: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  task?: Task; // optional task for editing
  onSave: (updatedTask: Partial<Task>) => void; // Function to handle save
}

const TaskForm = ({
  type,
  defaultProgressOrder,
  setIsModalOpen,
  task,
  onSave,
}: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>(task?.title || '');
  const [detail, setDetail] = useState<string>(task?.detail || '');
  const [dueDate, setDueDate] = useState<string>(task?.dueDate || '');
  const [progressOrder, setProgressOrder] = useState<number>(
    task?.progressOrder || defaultProgressOrder
  );

  const { addTask, editTask } = useTasksAction();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDueDate(task.dueDate);
      setProgressOrder(task.progressOrder || defaultProgressOrder);
    }
  }, [task, defaultProgressOrder]);

  const handleSubmit = (): void => {
    const updatedTask: Partial<Task> = {
      title,
      detail,
      dueDate,
      progressOrder,
    };

    if (type === TASK_MODAL_TYPE.ADD) {
      addTask(title, detail, dueDate, progressOrder);
    } else if (type === TASK_MODAL_TYPE.EDIT && task) {
      editTask(task.id, updatedTask);
    }

    onSave(updatedTask);
    setIsModalOpen(false);
  };

  return (
    <form style={styles.form}>
      <div style={styles.formItem}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e): void => setTitle(e.target.value)}
          style={styles.formInput}
        />
      </div>
      <div style={styles.formItem}>
        <label htmlFor="detail">Detail:</label>
        <textarea
          id="detail"
          value={detail}
          onChange={(e): void => setDetail(e.target.value)}
          style={styles.formTextArea}
        />
      </div>
      <div style={styles.formItem}>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e): void => setDueDate(e.target.value)}
          style={styles.formInput}
        />
      </div>
      <div style={styles.formItem}>
        <label htmlFor="progress">Progress:</label>
        <select
          id="progress"
          style={styles.formInput}
          value={progressOrder}
          onChange={(e): void => setProgressOrder(Number(e.target.value))}
        >
          <option value={TASK_PROGRESS_ID.NOT_STARTED}>
            {TASK_PROGRESS_STATUS.NOT_STARTED}
          </option>
          <option value={TASK_PROGRESS_ID.IN_PROGRESS}>
            {TASK_PROGRESS_STATUS.IN_PROGRESS}
          </option>
          <option value={TASK_PROGRESS_ID.WAITING}>
            {TASK_PROGRESS_STATUS.WAITING}
          </option>
          <option value={TASK_PROGRESS_ID.COMPLETED}>
            {TASK_PROGRESS_STATUS.COMPLETED}
          </option>
        </select>
      </div>
      <button type="button" style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

const styles: CSSProperties = {
  form: {
    fontSize: '24px',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  formInput: {
    height: '40px',
    fontSize: '20px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  formTextArea: {
    height: '80px',
    fontSize: '20px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#55C89F',
    color: '#fff',
    fontSize: '20px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskForm;
