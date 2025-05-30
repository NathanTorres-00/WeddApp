import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Calendar, Users, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleSidebar }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/budget', name: 'Budget', icon: <DollarSign size={20} /> },
    { path: '/timeline', name: 'Timeline', icon: <Calendar size={20} /> },
    { path: '/vendors', name: 'Vendors', icon: <Users size={20} /> },
  ];

  return (
    <div 
      className="fixed inset-0 bg-gray-900/50 z-40 transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-lg font-display font-semibold text-primary-800">Menu</span>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-primary-600 transition-colors duration-150"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="pt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={toggleSidebar}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 my-1 mx-2 rounded-md transition-all duration-150 
                    ${isActive 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-600 hover:bg-gray-100'}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-100 mt-8">
          <div className="text-sm text-gray-600">
            <p className="mb-1">Wedding Date</p>
            <p className="font-medium text-gray-800">June 15, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;