import React from 'react';

const Logo = () => {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
      
      <span className="text-[3.5rem] sm:text-[4.5rem] font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text select-none">
        D
      </span>

      
      <span className="absolute top-[31%] md:top-[34%] text-xl sm:text-2xl font-semibold bg-gradient-to-r from-red-500 to-orange-600 text-transparent select-none bg-clip-text pointer-events-none animate-pulse">
        S
      </span>
    </div>
  );
};

export default Logo;
