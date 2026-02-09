import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PokeSkeleton from "./PokeSkeleton";
import { useTypeStyles } from "./TypeContext";



function PokeList() {
  const { currentGen } = useOutletContext();
  const [offset, setOffset] = useState(currentGen.offset);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  const navigate = useNavigate();

  const typeStyles = useTypeStyles();

  const handleStatusNav = (id)=>{
    navigate(`/status/${id}`)
  }

  // 1. RESET everything when the generation changes
  useEffect(() => {
    setPokemonData([]);
    setOffset(currentGen.offset);
    setLoading(false);
  }, [currentGen]);

  const fetchAllDetails = async (currentOffset) => {
    if (loading || currentOffset >= currentGen.max) return;
    setLoading(true);

    try {
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

  // 2. Initial Fetch
  useEffect(() => {
    if (pokemonData.length === 0) {
      fetchAllDetails(currentGen.offset);
    }
  }, [pokemonData, currentGen]);

  // 3. Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && offset < currentGen.max) {
          fetchAllDetails(offset);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [offset, loading, currentGen]);

  return (
    <div className="mt-32 px-4 md:px-10 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-y-9 gap-x-6 justify-items-center">
        {/* Real Cards */}
        {pokemonData.map((item) => {
          const primaryType = item.types.find((t) => t.slot === 1).type.name;
          const cardStyle = typeStyles[primaryType] || typeStyles.normal;

          return (
            <div
              key={item.id}
              onClick={()=> handleStatusNav(item.id)}
              className={`relative w-full h-118 p-6 rounded-[2.5rem] border-2 shadow-2xl flex flex-col items-center overflow-hidden transform hover:scale-105 hover:cursor-pointer transition-all duration-300 bg-linear-to-br ${cardStyle}`}
            >
              <div className="absolute top-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
              <p className="z-10 text-xs uppercase tracking-[0.2em] text-white/90 font-black mb-1 drop-shadow-md">
                {primaryType}
              </p>
              <span className="self-center z-10 text-white font-black opacity-40 text-lg">
                #{String(item.id).padStart(3, "0")}
              </span>
              <div className="pokemon-bounce relative mt-16 z-10 w-48 h-48 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/30 shadow-inner mb-2">
                <img
                  src={item.sprites.other["official-artwork"].front_default}
                  className="w-40 h-40 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110 brightness-110 contrast-110"
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

        {/* Skeletons inside the same grid */}
        {loading && (
          <>
            {[...Array(6)].map((_, i) => (
              <PokeSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={observerTarget} className="h-10 w-full" />
    </div>
  );
}

export default PokeList;