import React, { createContext, useContext } from 'react';

const TypeStyleContext = createContext();

export const TypeStyleProvider = ({children})=>{
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

      return (
        <TypeStyleContext.Provider value={typeStyles}>
        {children}
      </TypeStyleContext.Provider>
      );
}

export const useTypeStyles = ()=>{
    return useContext(TypeStyleContext)
}