import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

const typeStyles = {
  normal: "from-[#D8D8D8] to-[#929292] border-[#A8A878]",
  fire: "from-[#F70A0A] to-[#ED2D53] border-[#F70A0A]",
  water: "from-[#5090D3] to-[#14539A] border-[#6890F0]",
  grass: "from-[#12F70A] to-[#2DED5A] border-[#12F70A]",
  electric: "from-[#F7D02C] to-[#B19100] border-[#F8D030]",
  ice: "from-[#96D9D6] to-[#4A908E] border-[#98D8D8]",
  fighting: "from-[#C22E28] to-[#7D1F1B] border-[#C03028]",
  poison: "from-[#A33EA1] to-[#682468] border-[#A040A0]",
  ground: "from-[#E2BF65] to-[#8E7531] border-[#E0C068]",
  flying: "from-[#A98FF3] to-[#6D5E9C] border-[#A890F0]",
  psychic: "from-[#F95587] to-[#A13959] border-[#F85888]",
  bug: "from-[#A6B91A] to-[#6D7815] border-[#A8B820]",
  rock: "from-[#B6A136] to-[#786923] border-[#B8A038]",
  ghost: "from-[#735797] to-[#483560] border-[#705898]",
  dragon: "from-[#6F35FC] to-[#4924A1] border-[#7038F8]",
  steel: "from-[#B7B7CE] to-[#78788E] border-[#B8B8D0]",
  dark: "from-[#705746] to-[#49392F] border-[#705848]",
  fairy: "from-[#D685AD] to-[#9B4872] border-[#EE99AC]",
};

function PokeList() {
  const { currentGen } = useOutletContext();
  const [offset, setOffset] = useState(currentGen.offset);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track first load
  const observerTarget = useRef(null);


// 1. RESET everything when the generation changes
useEffect(() => {
  setPokemonData([]);
  setOffset(currentGen.offset);
  setLoading(false); 
}, [currentGen]);

const fetchAllDetails = async (currentOffset) => {
  // PREVENT OVERFLOW: If the next fetch would exceed the max for this Gen, stop.
  if (loading || currentOffset >= currentGen.max) return;

  setLoading(true);
  
  try {
    // Calculate how many to fetch (don't exceed currentGen.max)
    const remaining = currentGen.max - currentOffset;
    const limitToFetch = Math.min(20, remaining);

    if (limitToFetch <= 0) return;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitToFetch}&offset=${currentOffset}`
    );
    const listData = await response.json();

    const detailedData = await Promise.all(
      listData.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      })
    );

    setPokemonData((prev) => [...prev, ...detailedData]);
    setOffset(currentOffset + limitToFetch);
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  } finally {
    setLoading(false);
  }
};

// 2. Initial Fetch for new generation
useEffect(() => {
  if (pokemonData.length === 0) {
    fetchAllDetails(currentGen.offset);
  }
}, [pokemonData, currentGen]);

// 3. Observer Logic with strict boundary check
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // Strict check: only fetch if we are below the generation's max ID
      if (entries[0].isIntersecting && !loading && offset < currentGen.max) {
        fetchAllDetails(offset);
      }
    },
    { threshold: 0.1 } // Lower threshold is more responsive for infinite scroll
  );

  if (observerTarget.current) observer.observe(observerTarget.current);
  return () => observer.disconnect();
}, [offset, loading, currentGen]);
  
  // Show "Scanning" only on the first visit
  if (isInitialLoad && pokemonData.length === 0) {
    return (
      <div className="mt-32 text-center text-2xl font-mono animate-pulse">
        Scanning Poké-verse...
      </div>
    );
  }

  return (
    <div className="mt-32 px-4 md:px-10 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-9 gap-x-6 justify-items-center">
        {pokemonData.map((item) => {
          const primaryType = item.types.find((t) => t.slot === 1).type.name;
          const cardStyle = typeStyles[primaryType] || typeStyles.normal;

          return (
            <div
              key={item.id}
              className={`relative w-full h-128 p-6 rounded-[2.5rem] border-2 shadow-2xl flex flex-col items-center overflow-hidden transform hover:scale-105 hover:cursor-pointer transition-all duration-300 bg-linear-to-br ${cardStyle}`}
            >
              <div className="absolute top-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
              <p className="z-10 text-xs uppercase tracking-[0.2em] text-white/90 font-black mb-1 drop-shadow-md">
                {primaryType}
              </p>
              <span className="self-center z-10 text-white font-black opacity-40 text-lg">
                #{String(item.id).padStart(3, "0")}
              </span>
              <div className="pokemon-bounce relative mt-16 z-10 w-48 h-48 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/30 shadow-inner mb-2 ">
                <img
                  src={item.sprites.other["official-artwork"].front_default}
                  className="w-40 h-40 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110 brightness-110 contrast-110 "
                  alt={item.name}
                />
              </div>
              <p className="z-10 text-3xl text-white capitalize font-black mt-8 drop-shadow-lg">
                {item.name}
              </p>
              <div className="z-10 flex gap-3 mt-5">
                {item.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div ref={observerTarget} className="h-20 w-full flex justify-center items-center mt-10">
        {loading && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono mt-2 animate-pulse">Loading more Pokémon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokeList;