
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SideMenuLayout from './layouts/SideMenuLayout';
import { RecoilRoot } from 'recoil' // Ditambahkan
import TaskSummary from './features/tasks/components/TaskSummary';
import TaskList from './features/tasks/components/TaskList/TaskList'
import TaskProgress from './features/tasks/components/TaskProgress/TaskProgress'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideMenuLayout />,
    children: [
      {
        path: '/',
        element: <TaskSummary />, // Diperbarui
      },
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: '/task-list',
        element: <TaskList />, // diperbarui
      },
      {
        path: '/task-progress',
        element: <TaskProgress />, // diperbarui
      },
      {
        path: 'task-list',
        element: <h1>Task List</h1>,
      },
      {
        path: 'task-progress',
        element: <h1>Task Progress</h1>,
      },
      
    ],
  },
]);

function App(): JSX.Element {
  return (
    // Apit dengan RecoilRoot
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App;
