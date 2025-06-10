import React from 'react';
const PopUpmess = ({ boolean, message }) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-black font-medium px-6 py-3 rounded-md transition-all duration-500 ease-in-out
          ${
            boolean ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }
        `}
    >
      {message}
    </div>
  );
};

export default PopUpmess;
