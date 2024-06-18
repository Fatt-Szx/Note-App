import React from 'react'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'

interface TaskCardProps {
  task: Task
}

const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
    const justifyContentValue: 'flex-end' | 'space-between' =
      // Raw data telah digantikan
      progressOrder === TASK_PROGRESS_ID.NOT_STARTED
        ? 'flex-end'
        : 'space-between'
    return {
      display: 'flex',
      justifyContent: justifyContentValue,
    }
  }

  const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
    return (
      <div style={styles.taskCard}>
        ...
        <div style={getArrowPositionStyle(task.progressOrder)}>
           {/* Raw data telah digantikan */}
          {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
            <button className="material-icons">chevron_left</button>
          )}
          {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
            <button className="material-icons">chevron_right</button>
          )}
        </div>
      </div>
    )
  }

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
}

export default TaskCard