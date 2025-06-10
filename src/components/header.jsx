// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  // const [btn_name, setbtnName] = useState('Login');

  // console.log('header rendered');

  //if there is no dependency array in useState hook then useState is called on every render...
  //if there is e=an empty array passed then useStete is called on initial render i.e just once..
  //if( any depdendency is passed in the array then useState is called if the dependency changes)...

  // useEffect(() => {
  //   console.log('usestate rendered');
  // });

  const cartItems = useSelector((store) => store.cart);
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <div className="flex justify-between items-center bg-white text-[18px] p-2 border-b border-green-600">
        <div className="logo-container italic mt-2 mb-2 ml-2">
          <Link to={'/'} className="flex items-center gap-2">
            <img
              className="w-16 h-16 object-cover border-4 border-white"
              src="https://www.svgrepo.com/show/490737/food-dish.svg"
              alt=""
            />
            <span className="flex flex-col text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text">
              TastyBites
            </span>
          </Link>
        </div>
        <div>
          <ul>
            <div className="flex gap-8 p-4 items-center">
              {isAuthenticated && (
                <span className="text-[15px] text-gray-400 border-b border-gray-400 not-italic">
                  {user.name}
                </span>
              )}
              <li>
                <Link
                  to="/"
                  className="hover:border-b-2 transition-all duration-100"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:border-b-2 transition-all duration-100"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:border-b-2 transition-all duration-100"
                >
                  Conatct us
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:border-b-2 font-semibold transition-all duration-100"
                >
                  Cart
                  {cartItems.length == 0 ? '' : `(${cartItems.length})`}
                </Link>
              </li>
              {isAuthenticated ? (
                <button
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              ) : (
                <button
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
