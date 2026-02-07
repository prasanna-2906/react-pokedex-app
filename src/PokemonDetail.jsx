import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetail(data);
      } catch (error) {
        console.log("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-32 text-center text-xl">
        Loading Pokemon Details...
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
    {/* Added 'flex' to the card below */}
    <div className="mt-36 flex items-center border border-[#F2ECD9] shadow-sm p-8 hover:shadow-md transition-shadow rounded-3xl w-300 h-120 bg-[#FFFDF7]">
      
      {/* LEFT SIDE: Image Container */}
      <div className="shrink-0 w-1/5 flex justify-center pokemon-float">
        <img 
          className="w-72 h-72 object-contain"
          src={pokemonDetail.sprites.other["official-artwork"].front_default} 
          alt={pokemonDetail.name} 
        />
      </div>
  
      {/* RIGHT SIDE: Details Container */}
      <div className="flex-1 px-8">
        <h1 className="text-5xl font-bold capitalize text-gray-800 mb-4">
          {pokemonDetail.name}
        </h1>
        
        {/* You can add types, stats, or abilities here later */}
        <div className="text-gray-500 text-lg">
          ID: #{pokemonDetail.id}
        </div>


      </div>
  
    </div>
  </div>
  );
}

export default PokemonDetail;
