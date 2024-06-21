import { Dispatch, SetStateAction } from 'react';
import { CSSProperties, Task } from '../../../../types';
import TaskForm from './TaskForm';

interface TaskModalProps {
  headingTitle: string;
  type: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  defaultProgressOrder: number;
  task?: Task; // Optional for edit
  onSave: (updatedTask: Partial<Task>) => void; // Function to handle save
}

const TaskModal = ({
  headingTitle,
  type,
  setIsModalOpen,
  defaultProgressOrder,
  task,
  onSave,
}: TaskModalProps): JSX.Element => {
  const handleSave = (updatedTask: Partial<Task>): void => {
    onSave(updatedTask); // Memanggil fungsi onSave yang diteruskan dari props
    setIsModalOpen(false); // Menutup modal setelah menyimpan task
  };

  return (
    <div style={styles.container} data-testid="task-modal">
      <div style={styles.modalTop}>
        <h1>{headingTitle}</h1>
        <span
          className="material-icons"
          style={styles.icon}
          onClick={() => setIsModalOpen(false)}
          data-testid="close-modal-button"
        >
          close
        </span>
      </div>
      <TaskForm
        type={type}
        defaultProgressOrder={defaultProgressOrder}
        setIsModalOpen={setIsModalOpen}
        task={task}
        onSave={handleSave} // Menggunakan fungsi handleSave untuk menyimpan task
      />
    </div>
  );
};

const styles: CSSProperties = {
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  icon: {
    cursor: 'pointer',
  },
};

export default TaskModal;
