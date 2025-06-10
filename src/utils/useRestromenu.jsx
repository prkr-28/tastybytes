import { useState, useEffect } from 'react';

const useRestromenu = (resid) => {
  const [resmenu, setresmenu] = useState(null);

  useEffect(() => {
    fetchmenu();
  }, []);

  const fetchmenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${resid}&submitAction=ENTER`
    );
    const json = await data.json();

    setresmenu(json.data);
  };
  return resmenu;
};

export default useRestromenu;
