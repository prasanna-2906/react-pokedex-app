import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypeStyles } from "./TypeContext";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const {typeStyles,typeIcon} = useTypeStyles();

  const statsStyle =
    "border rounded-2xl p-12 flex-nowrap font-bold w-32 h-20 font-mono text-gray-700 bg-red-100 border-red-100 shadow-md hover:shadow-lg hover:scale-110 mt-4 flex flex-col justify-center items-center";

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetail(data);

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = await speciesRes.json();

        const englishEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );

        if (englishEntry) {
          const cleanEntry = englishEntry.flavor_text.replace(/[\f\n\t]/g, " ");
          setDescription(cleanEntry);
        }
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
      <div className="mt-36 flex items-center border border-[#F2ECD9] shadow-sm p-8 hover:shadow-md transition-shadow rounded-3xl w-300 h-120 bg-sky-50">
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
          <h1 className="flex items-center font-mono gap-4 text-5xl font-extrabold capitalize text-gray-800 mb-6">
            {pokemonDetail.name}{" "}
            <span className="text-[#424957] text-3xl font-bold tracking-tight">
              #{String(pokemonDetail.id).padStart(3, "0")}
            </span>
          </h1>

          {/* 2. DYNAMIC TYPES DISPLAY */}
          <div className="flex gap-3">
            {pokemonDetail.types.map((t) => {
              const typeName = t.type.name;
              // Get style from context or fallback to a default
              const style = typeStyles[typeName] || "bg-gray-400";
              const iconPath = typeIcon[typeName];

              return (
                <span
                  key={typeName}
                  className={`flex items-center gap-2 px-6 py-2 font-display rounded-xl text-white font-bold capitalize border-b-4 shadow-md  bg-linear-to-br ${style}`}
                >
                  {iconPath && (
                    <div
                      className="w-5 h-5 bg-white" // This color is what the icon will be
                      style={{
                        maskImage: `url(${iconPath})`, // Ensure leading slash if using public folder
                        WebkitMaskImage: `url(${iconPath})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  )}

                  {typeName}
                </span>
              );
            })}
          </div>

          <div>
            <h3 className="text-bold font-mono text-3xl text-gray-800 mt-3">
              Description
            </h3>
            <p className="mt-2 font-display text-gray-400 text-xl text-medium">
              {description}
            </p>
          </div>
          <div className="flex gap-5">
            <div className={statsStyle}>
              <h5 className="flex gap-2"> <div
                      className="w-7 h-7 bg-black mb-3" // This color is what the icon will be
                      style={{
                        maskImage: `url(/icons/ruler.svg)`, // Ensure leading slash if using public folder
                        WebkitMaskImage: `url(/icons/ruler.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />Height</h5>
              <span className="text-2xl text-[#2f2c23] font-semibold">
                {pokemonDetail.height}m
              </span>
            </div>
            <div className={statsStyle}>
              <h5 className="flex gap-2">
              <div
                      className="w-7 h-7 bg-black mb-3" // This color is what the icon will be
                      style={{
                        maskImage: `url(/icons/weight.svg)`, // Ensure leading slash if using public folder
                        WebkitMaskImage: `url(/icons/weight.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />Weight
              </h5>
              <span className="text-2xl text-[#2f2c23] font-semibold">
                {pokemonDetail.weight}kg
              </span>
            </div>
            <div className={statsStyle} >
              <h5 className="flex gap-2">
              <div
                      className="w-7 h-7 bg-black mb-3" // This color is what the icon will be
                      style={{
                        maskImage: `url(/icons/life-line.svg)`, // Ensure leading slash if using public folder
                        WebkitMaskImage: `url(/icons/life-line.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />HP</h5>
              <span className="text-2xl text-[#2f2c23] font-semibold">
                {
                  pokemonDetail.stats.find((entry) => entry.stat.name === "hp")
                    ?.base_stat
                }
              </span>
            </div>
            <div className={statsStyle}>
              <h5 className="flex gap-2 flex-nowrap">
              <div
                      className="w-9 h-9 bg-black mb-3" // This color is what the icon will be
                      style={{
                        maskImage: `url(/icons/xp.svg)`, // Ensure leading slash if using public folder
                        WebkitMaskImage: `url(/icons/xp.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />Base XP</h5>
              <span className="text-2xl text-[#2f2c23] font-semibold">
                {pokemonDetail.base_experience}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
