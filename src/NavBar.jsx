import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar({onGenChange}) {

  const navigate = useNavigate();

  const handleGenClick = (id) => {
    onGenChange(id);      // Change the data
    navigate(`/pokedex?gen=${id}`); // Ensure we are on the pokedex page
  };

  return (
    <nav className=" fixed top-0 w-full z-50 h-20 bg-[#4A4E51]/75 backdrop-blur-sm border-b t border-white/10 text-[#FFFFFF] px-10 flex justify-between items-center tracking-wider font-bold">
      <div>
        <p>POKEMON</p>
      </div>
      <ul className="flex items-center space-x-8 h-full hover:cursor-pointer">
        <li onClick={()=> navigate('/')}>Home</li>
        <li className="group relative  text-white ">
          Generation
          <ul className="hidden group-hover:flex flex-col absolute left-0 top-full w-48 bg-white/90 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* I added a "top-full" and removed pt-2 to ensure the hover bridge is solid */}

            <li
              onClick={() => handleGenClick(1)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen I
            </li>
            <li
              onClick={() => handleGenClick(2)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen II
            </li>
            <li
              onClick={() => handleGenClick(3)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen III
            </li>
            <li
              onClick={() => handleGenClick(4)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen IV
            </li>
            <li
            onClick={() => handleGenClick(5)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen V
            </li>
            <li
            onClick={() => handleGenClick(6)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen VI
            </li>
            <li
            onClick={() => handleGenClick(7)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen VII
            </li>
            <li
            onClick={() => handleGenClick(8)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen VIII
            </li>
            <li
            onClick={() => handleGenClick(9)}
              className="group/item px-5 py-3 text-[#18181b] font-bold rounded-lg
                 hover:bg-zinc-200/80 hover:text-[#0E3995] hover:pl-7 
                 transition-all duration-300 cursor-pointer flex items-center relative overflow-hidden"
            >
              {/* Animated accent bar on the left */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#0E3995] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center" />
              Gen IX
            </li>
          </ul>
        </li>
        <li>Search</li>
        <li>Filter</li>
      </ul>
    </nav>
  );
}

export default NavBar;
