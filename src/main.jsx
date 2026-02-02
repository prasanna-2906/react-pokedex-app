import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './home.jsx'
import PokeList from './PokeList.jsx'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <App/>,
      children : [
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/pokedex',
          element:<PokeList/>
        }
      ]
    }
  ]
  )

createRoot(document.getElementById('root')).render(
  
   <RouterProvider router={router}/>
  
)
