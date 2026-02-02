import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './NavBar'
import { useState } from 'react';

const GENERATIONS = {
  all: { limit: 20, offset: 0, max: 151 }, // Example: Default to Gen 1
  1: { limit: 20, offset: 0, max: 151 },
  2: { limit: 20, offset: 151, max: 251 },
  3: { limit: 20, offset: 251, max: 386 },
  4: { limit: 20, offset: 386, max: 493 },
  5: { limit: 20, offset: 493, max: 649 },
  6: { limit: 20, offset: 649, max: 721 },
  7: { limit: 20, offset: 721, max: 809 },
  8: { limit: 20, offset: 809, max: 905 },
  9: { limit: 20, offset: 905, max: 1025 },
};

function App() {
 
  const [currentGen,setCurrentGen] = useState(GENERATIONS[1]); 

  return (
    <> 
      <div className="min-h-screen bg-[#FCF9EE]">
      {/* This NavBar stays visible on ALL pages */}
      <NavBar  onGenChange={(genId) =>setCurrentGen(GENERATIONS[genId])}/> 
      
      {/* The child components (Home, PokeList, etc.) render here */}
      <main>
        <Outlet context={{ currentGen }}/>
      </main>
    </div>
    
    </>
  )
}

export default App
