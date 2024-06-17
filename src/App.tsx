import { useState } from 'react';
import React from 'react' 
import './App.css';
import { RecoilRoot } from 'recoil';
import TaskSummary from './features/tasks/components/TaskSummary';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
    {
      path: '/',
      element: <TaskSummary />, // Diperbarui
    }
  ])

function App(): JSX.Element {
  
  return (
    // Apit dengan RecoilRoot
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App;
