import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './home.jsx'
import PokeList from './PokeList.jsx'
import PokemonDetail from './PokemonDetail.jsx'
import { TypeStyleProvider } from './TypeContext.jsx'

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
        },
        {
          path:'/status/:id',
          element:<PokemonDetail/>
        }
      ]
    }
  ]
  )

createRoot(document.getElementById('root')).render(
  <TypeStyleProvider>
    <RouterProvider router={router}/>
  </TypeStyleProvider>
   
  
)
