const Restrocards = ({ resData }) => {
  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    sla,
    cloudinaryImageId,
    veg,
  } = resData.info;

  return (
    <div className="w-72 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <img
        className="w-full h-44 object-cover"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt="restaurant"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {cuisines.join(', ')}
        </p>
        <p className="text-sm text-gray-600 mt-1">{costForTwo}</p>
        <p className="text-sm font-medium text-green-600 mt-1">
          {avgRating} ⭐{' '}
          <span className="text-gray-500">({totalRatingsString})</span>
        </p>
        <p className="text-sm text-gray-700 mt-1">
          {sla.deliveryTime} min delivery
        </p>
      </div>
    </div>
  );
};

//higher order components....
// it return another component which is enhanced component...

export const withveglabel = (Restrocards) => {
  return ({ resData }) => {
    return (
      <div className="relative">
        <label className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-br">
          🌱 Veg
        </label>
        <Restrocards resData={resData} />
      </div>
    );
  };
};

export default Restrocards;
