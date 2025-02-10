import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebsiteLayout from './Layouts/WebsiteLayout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './Pages/HomePage'
import FavoritesPage from './Pages/FavoritesPage'
import { FlightProvider } from './context/FlightContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/favorites",
        element: <FavoritesPage />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FlightProvider>
        <RouterProvider router={router} />
      </FlightProvider>
  </StrictMode>,
)
