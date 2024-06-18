import React from 'react'
import { useRecoilValue } from 'recoil'
import { completedTasksSelector, uncompletedTasksSelector, } from '../TaskSelectors'
import type { Task, CSSProperties } from '../../../types'
import { Link } from 'react-router-dom' // Ditambahkan

const TaskSummary = (): JSX.Element => {
    // Mendapatkan tasks dari Selectors
  const completedTasks =
    useRecoilValue<Task[]>(completedTasksSelector)

  const uncompletedTasks =
    useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Summary of Your Tasks</h1>
      <div style={styles.list}>
        ...
      </div>
      <div style={styles.list}>
        ...
      </div>
      {/* Tambahkan code di bawah */}
      <div style={styles.links}>
        <Link to="/task-list" style={styles.link}>
          See Your Task List
        </Link>
        <Link to="/progress-management" style={styles.link}>
          Manage Your Task Progress
        </Link>
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '40px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  list: {
    color: '#fff',
    backgroundColor: '#55C89F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    width: '60%',
    links: {
      display: 'flex',
    },
    link: {
      padding: '16px',
      marginRight: '24px',
      backgroundColor: '#55ACC8',
      color: '#fff',
      borderRadius: '8px',
      textDecoration: 'none',
    },
  }
}

export default TaskSummary