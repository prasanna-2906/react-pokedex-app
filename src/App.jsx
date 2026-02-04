import { Outlet, useSearchParams } from 'react-router-dom'
import './App.css'
import NavBar from './NavBar'
import { useState,useEffect } from 'react';

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
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read 'gen' from URL (e.g., ?gen=3). Default to '1' if missing.
  const currentGenId = searchParams.get('gen') || '1';
  
  // State is now derived from the URL value
  const [currentGen, setCurrentGen] = useState(GENERATIONS[currentGenId]); 

  // Sync state if the URL changes (e.g., user clicks 'back' in browser)
  useEffect(() => {
    if (GENERATIONS[currentGenId]) {
      setCurrentGen(GENERATIONS[currentGenId]);
    }
  }, [currentGenId]);

  const handleGenChange = (genId) => {
    // Update the URL; the useEffect above will handle the state update
    setSearchParams({ gen: genId });
  };
  return (
    <> 
      <div className="min-h-screen bg-[#FCF9EE]">
      {/* This NavBar stays visible on ALL pages */}
      <NavBar  onGenChange={handleGenChange}/> 
      
      {/* The child components (Home, PokeList, etc.) render here */}
      <main>
        <Outlet context={{ currentGen }}/>
      </main>
    </div>
    
    </>
  )
}

export default App
