import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem } from '../utils/cartSlice';
import { FaTrashAlt } from 'react-icons/fa'; // FontAwesome Trash icon
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);

  // Total price calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.card.info.price / 100 || item.card.info.defaultPrice / 100;
    return total + itemPrice * item.quantity;
  }, 0);

  const dispatch = useDispatch();
  const handlecleacart = () => {
    dispatch(clearCart());
    toast.warn('Cart items cleared', {
      position: 'top-center',
      autoClose: 1500,
    });
  };

  const handleremoveitem = (id) => {
    dispatch(removeItem(id));
    toast.warn('Item removed', {
      className: 'bg-green-600 text-white font-semibold rounded-md',
      progressClassName: 'bg-white',
      position: 'top-center',
      autoClose: 1500,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 to-orange-200 p-6 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.card.info.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center justify-between w-full px-4 py-3 bg-white">
                    <div className="flex items-center gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.card.info.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-700">
                        ₹{' '}
                        {item.card.info.price
                          ? (item.card.info.price / 100) * item.quantity
                          : (item.card.info.defaultPrice / 100) * item.quantity}
                      </p>
                      <span className="text-xs text-gray-500">
                        ₹{' '}
                        {item.card.info.price / 100 ||
                          item.card.info.defaultPrice / 100}{' '}
                        each
                      </span>
                    </div>
                  </div>

                  <button
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    onClick={() => handleremoveitem(item.card.info.id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Total Bill</h3>
              <span className="text-xl font-bold text-green-600">
                ₹ {totalPrice}
              </span>
            </div>

            <div className="flex gap-4">
              <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-300 cursor-pointer">
                Proceed to Checkout
              </button>
              <button
                className="mt-6 w-30 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-3 rounded-xl transition duration-300 cursor-pointer"
                onClick={handlecleacart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
