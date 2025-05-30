import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/budget', name: 'Budget', icon: <DollarSign size={20} /> },
    { path: '/timeline', name: 'Timeline', icon: <Calendar size={20} /> },
    { path: '/vendors', name: 'Vendors', icon: <Users size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-md">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {isOpen && (
          <span className="text-lg font-display font-semibold text-primary-800">Menu</span>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto text-gray-500 hover:text-primary-600 transition-colors duration-150"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 my-1 mx-2 rounded-md transition-all duration-150 
                  ${isActive 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'text-gray-600 hover:bg-gray-100'}`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="text-xs text-gray-500">
            <p className="mb-1">Wedding Date</p>
            <p className="font-medium text-gray-700">June 15, 2025</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;