import React from 'react';

const Authlayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-200 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export default Authlayout;