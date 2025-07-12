import { motion } from 'framer-motion';
import { Clock, Star, MapPin } from 'lucide-react';

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt={name}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-500 fill-current" size={14} />
          <span className="text-sm font-semibold">{avgRating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {cuisines.join(', ')}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">{costForTwo}</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={14} />
            <span>{sla.deliveryTime} min</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-current" size={14} />
            <span className="font-medium">{avgRating}</span>
            <span className="text-gray-500">({totalRatingsString})</span>
          </div>
          
          {sla.lastMileTravelString && (
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin size={14} />
              <span>{sla.lastMileTravelString}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

//higher order components....
// it return another component which is enhanced component...

export const withveglabel = (Restrocards) => {
  return ({ resData }) => {
    return (
      <div className="relative">
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold z-10 flex items-center gap-1">
          🌱 Veg
        </div>
        <Restrocards resData={resData} />
      </div>
    );
  };
};

export default Restrocards;
