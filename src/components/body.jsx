import Restrocards from './Restrocards.jsx';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShimmerUI from './shimmer.jsx';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlinestatus.jsx';
import { withveglabel } from './Restrocards.jsx';
import { Search, Filter, Star, Wifi, WifiOff } from 'lucide-react';

const Body = () => {
  const [listofrestro, setlistofrestro] = useState([]);
  const [filteredrestro, setfilteredrestro] = useState([]);
  const [searchtext, setsearchtext] = useState('');
  const [isTopRatedFilter, setIsTopRatedFilter] = useState(false);

  const Restrocardwithveglabel = withveglabel(Restrocards);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      '/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=20.2959847&lng=85.8246101&carousel=true&third_party_vendor=1'
    );

    const json = await data.json();
    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setlistofrestro(restaurants);
    setfilteredrestro(restaurants);
  };

  const handleSearch = () => {
    const filterdlist = listofrestro.filter((res) =>
      res.info.name.toLowerCase().includes(searchtext.toLowerCase())
    );
    setfilteredrestro(filterdlist.length === 0 ? listofrestro : filterdlist);
  };

  const onlinestatus = useOnlineStatus();

  if (!onlinestatus) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-red-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <WifiOff size={64} className="text-red-500 mb-4" />
        </motion.div>
        <h1 className="text-2xl font-semibold text-red-700 mb-2">
          No Internet Connection
        </h1>
        <p className="text-red-600">Please check your connection and try again</p>
      </motion.div>
    );
  }

  const handleTopRatedFilter = () => {
    if (isTopRatedFilter) {
      setfilteredrestro(listofrestro);
      setIsTopRatedFilter(false);
    } else {
      const filterdlist = listofrestro.filter((res) => res.info.avgRating >= 4.5);
      setfilteredrestro(filterdlist);
      setIsTopRatedFilter(true);
    }
  };

  const clearSearch = () => {
    setsearchtext('');
    setfilteredrestro(listofrestro);
    setIsTopRatedFilter(false);
  };

  if (listofrestro.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <ShimmerUI />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Delicious Food, Delivered Fast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Order from your favorite restaurants and get it delivered to your doorstep
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  value={searchtext}
                  onChange={(e) => setsearchtext(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2"
              >
                <Search size={18} />
                Search
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTopRatedFilter}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  isTopRatedFilter
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star size={18} />
                {isTopRatedFilter ? 'Show All' : 'Top Rated'}
              </motion.button>

              {(searchtext || isTopRatedFilter) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSearch}
                  className="bg-gray-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all"
                >
                  Clear
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isTopRatedFilter ? 'Top Rated Restaurants' : 'All Restaurants'}
          </h2>
          <p className="text-gray-600">
            {filteredrestro.length} restaurant{filteredrestro.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Restaurant Grid */}
        {filteredrestro.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredrestro.map((restaurant, index) => (
              <motion.div
                key={restaurant.info.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/restromenu/${restaurant.info.id}`}
                  className="block"
                >
                  {restaurant.info.veg ? (
                    <Restrocardwithveglabel resData={restaurant} />
                  ) : (
                    <Restrocards resData={restaurant} />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
