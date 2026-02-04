import React from 'react'

const PokeSkeleton = () => (
    // REMOVE the grid wrapper from here
    <div className="relative w-full h-128 p-6 rounded-[2.5rem] border-2 border-zinc-200 bg-zinc-100/50 flex flex-col items-center overflow-hidden animate-pulse">
      {/* Type Label */}
      <div className="w-24 h-4 bg-zinc-200 rounded mt-4" />
      {/* ID Label */}
      <div className="w-10 h-6 bg-zinc-200 rounded mt-2" />
      {/* Image Circle */}
      <div className="w-48 h-48 rounded-full bg-zinc-200 mt-16" />
      {/* Name Label */}
      <div className="w-40 h-10 bg-zinc-200 rounded mt-8" />
      {/* Type Pills */}
      <div className="flex gap-2 mt-5">
        <div className="w-16 h-8 bg-zinc-200 rounded-full" />
        <div className="w-16 h-8 bg-zinc-200 rounded-full" />
      </div>
    </div>
);

export default PokeSkeleton;