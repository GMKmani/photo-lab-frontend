import React from "react";
import Sidebar from "../pages/SideBar";
import Header from "../pages/Header";

const Layout = ({ children, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onHamburgerClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;