import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import { toast } from 'react-toastify';

const RestaurantCateg = ({ data, showItems, setshowindex }) => {
  const toggleList = () => {
    setshowindex();
  };

  const { title, itemCards } = data;

  const dispatch = useDispatch();

  const handleAddItem = (menu) => {
    dispatch(addItem(menu));
    toast.warn('Item added to the cart.', {
      position: 'top-center',
      autoClose: 1300,
    });
  };

  return (
    <div className="mb-4">
      {/* Accordion Header */}
      <button
        onClick={toggleList}
        className="cursor-pointer w-full text-left bg-blue-50 hover:bg-blue-200 text-blue-900 px-4 py-2 rounded-md font-semibold transition flex justify-between items-center"
      >
        {title} ({itemCards.length})
        <span className="text-xl">{showItems ? '🔺' : '🔻'}</span>
      </button>

      {/* Accordion Body (always rendered, just hidden/shown with max-height) */}
      {showItems && (
        <div className="transition-all duration-500 ease-in-out overflow-hidden bg-gray-50 border border-blue-100 rounded-md mt-2 px-4 ">
          <ul>
            {itemCards.map((menu) => (
              <li
                key={menu.card.info.id}
                className="flex justify-between bg-gray-50 p-3 border-b border-b-gray-300 list-none"
              >
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-[22px] font-extrabold text-gray-700">
                    {menu.card.info.name}
                  </span>
                  <p className="font-bold text-gray-800">
                    ₹
                    {menu.card.info.price / 100 ||
                      menu.card.info.defaultPrice / 100}
                  </p>
                  <span className="text-green-700">
                    {menu.card.info.ratings?.aggregatedRating?.rating
                      ? `⭐${menu.card.info.ratings.aggregatedRating.rating} (${menu.card.info.ratings.aggregatedRating.ratingCountV2})`
                      : 'Not Rated'}
                  </span>
                  <span className="text-gray-600 font-semibold">
                    {menu.card.info.description}
                  </span>

                  {/* Add to Cart Button */}
                  <div>
                    {/* Your item display code */}
                    <button
                      onClick={() => handleAddItem(menu)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center ml-4">
                  <img
                    className="w-28 h-28 rounded-2xl object-cover"
                    src={
                      menu.card.info.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${menu.card.info.imageId}`
                        : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoMHk5BhcrMdQM-edSn9DcXr8dxQG1GH5dwRk1i105FH1091FQZCY15f8&s`
                    }
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantCateg;
