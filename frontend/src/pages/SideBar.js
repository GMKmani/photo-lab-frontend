import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  ListOrdered,
  BarChart4,
  X,
  Info,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const navItemClass = (path) =>
    `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700" : ""
    }`;

  return (
    <div className="w-64 h-full bg-gray-800 p-4 flex flex-col text-white">
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">PHOTO LAB</h2>
      <nav className="flex flex-col gap-2">
      <Link to="/Homepage" className={navItemClass("/Homepage")} onClick={closeSidebar}>
          <Info size={18} /> About Us
        </Link>


        <Link to="/Dashboard" className={navItemClass("/Dashboard")} onClick={closeSidebar}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link
          to="/new-order"
          className={navItemClass("/new-order")}
          onClick={closeSidebar}
        >
          <FilePlus2 size={18} /> New Order
        </Link>
        <Link
          to="/orders"
          className={navItemClass("/orders")}
          onClick={closeSidebar}
        >
          <ListOrdered size={18} /> Order History
        </Link>
        {/* <Link
          to="/charts"
          className={navItemClass("/charts")}
          onClick={closeSidebar}
        >
          <BarChart4 size={18} /> Charts
        </Link> */}

       
      </nav>
    </div>
  );
};

export default Sidebar;
