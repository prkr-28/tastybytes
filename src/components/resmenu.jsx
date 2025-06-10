import { useState } from 'react';
import ShimmerList from './shimmerList';
import { useParams } from 'react-router-dom';
import useRestromenu from '../utils/useRestromenu';
import useOnlineStatus from '../utils/useOnlinestatus';
import RestaurantCateg from './rescategories';

const RestroMenu = () => {
  const { resid } = useParams();
  const resmenu = useRestromenu(resid);
  const onlinestatus = useOnlineStatus();
  const [showindex, setshowindex] = useState(0);

  // const [openSections, setOpenSections] = useState({}); // true/false for each section

  if (!onlinestatus) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <h1 className="text-xl font-semibold text-red-700">
          Oops! Check your internet connection!!
        </h1>
      </div>
    );
  }

  if (resmenu == null) {
    return <ShimmerList />;
  }

  const menuSections =
    resmenu?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  const restaurantInfo = resmenu?.cards[2]?.card?.card?.info;

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Restaurant Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          <img
            className="w-60 h-40 object-cover rounded-xl shadow-md"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantInfo?.cloudinaryImageId}`}
            alt="Restaurant"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {restaurantInfo?.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {restaurantInfo?.cuisines.join(', ')}
            </p>
            <p className="text-yellow-500 font-medium mt-1">
              {restaurantInfo?.avgRatingString} ⭐
            </p>
          </div>
        </div>
        {/* {accordian menu} */}
        <div>
          <h2 className="text-xl text-center font-bold mb-4 text-green-400 border-b pb-2">
            MENU
          </h2>

          {/* {categories..} */}
          {menuSections.map((category, index) => {
            return (
              <RestaurantCateg
                key={category.card.card.index}
                data={category?.card?.card}
                showItems={index === showindex ? true : false}
                setshowindex={() =>
                  setshowindex(index == showindex ? null : index)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestroMenu;
