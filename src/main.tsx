import ReactDOM from 'react-dom/client'
import React from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient';
import App from './App'
import Match from './pages/Match'
import './index.css'
import './reset.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/match/:id',
    element: <Match />
  }
])

export function ReactRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactRouter />
  </React.StrictMode>
)