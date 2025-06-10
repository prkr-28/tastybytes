import React from 'react';

const ShimmerList = ({ count = 5 }) => {
  const shimmerItems = Array.from({ length: count }, () => undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4 bg-gray-50">
      {shimmerItems.map((f, index) => (
        <div
          key={index}
          className="w-full max-w-md animate-bounce flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="rounded-full bg-gray-300 h-10 w-10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerList;
