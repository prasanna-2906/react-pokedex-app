import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {

    const navigate = useNavigate();
    

  return (
    <>
    <div className="relative h-screen w-full bg-[#FCF9EE] overflow-hidden">
      <div className="absolute top-60 left-1/2 -translate-x-1/2 text-center w-full px-4">
        {/* Headline */}
        <h2 className="text-6xl font-extrabold font-mono text-transparent bg-clip-text bg-linear-to-r from-[#E47B00] to-[#F9B600] drop-shadow-md mb-8">
          Uncover the mysteries of the Pokémon
        </h2>

        {/* Subtext Container */}
        <div className="max-w-3xl mx-auto space-y-3 mb-10">
          <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-snug">
            The world of Pokémon is vast and full of mystery.
          </p>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed tracking-wide">
            From the forests of Kanto to the peaks of Paldea. Search the archives,
            explore every habitat, and find the truth behind the legends.
          </p>
        </div>

        {/* Elevated Button */}
        <button 
        onClick={()=>  navigate("/pokedex")}
        className="bg-[#E47B00] hover:bg-[#C06800] text-white px-8 py-4 text-xl font-bold rounded-full 
                           shadow-lg shadow-orange-700/20 hover:shadow-orange-700/40 
                           transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
          Let your journey begin
        </button>
      </div>
    </div>
    </>
  );
  
}

export default Home;
