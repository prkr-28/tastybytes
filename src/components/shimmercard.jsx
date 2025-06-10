const ShimmerCard = () => {
  return (
    <div className="w-72 h-[320px] bg-white rounded-2xl shadow-md animate-pulse overflow-hidden">
      <div className="h-44 w-full bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};
export default ShimmerCard;
