import Restrocards from './Restrocards.jsx';
import { useState, useEffect } from 'react';
import ShimmerUI from './shimmer.jsx';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlinestatus.jsx';
import { withveglabel } from './Restrocards.jsx';

const Body = () => {
  const [listofrestro, setlistofrestro] = useState([]);
  const [filteredrestro, setfilteredrestro] = useState([]);
  const [searchtext, setsearchtext] = useState('');

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

  const onlinestatus = useOnlineStatus();

  if (!onlinestatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <h1 className="text-2xl font-semibold text-red-700">
          Oops! Check your internet connection!!
        </h1>
      </div>
    );
  }

  return listofrestro.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="bg-white min-h-screen py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-200 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 mx-auto max-w-6xl">
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-black focus:ring-2 focus:ring-purple-500 outline-none"
            value={searchtext}
            onChange={(e) => setsearchtext(e.target.value)}
          />
          <button
            onClick={() => {
              const filterdlist = listofrestro.filter((res) =>
                res.info.name.toLowerCase().includes(searchtext.toLowerCase())
              );
              setfilteredrestro(
                filterdlist.length === 0 ? listofrestro : filterdlist
              );
              setsearchtext('');
            }}
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Search
          </button>
        </div>

        {/* Filter */}
        <button
          onClick={() => {
            const filterdlist = listofrestro.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setfilteredrestro(filterdlist);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Top Rated (4.5+)
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredrestro.map((restorent) => (
          <Link
            key={restorent.info.id}
            to={`/restromenu/${restorent.info.id}`}
            className="no-underline text-inherit "
          >
            {restorent.info.veg ? (
              <Restrocardwithveglabel resData={restorent} />
            ) : (
              <Restrocards resData={restorent} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
