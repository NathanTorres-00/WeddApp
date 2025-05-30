import React from 'react';
import { Menu, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="mr-3 text-gray-700 hover:text-primary-600 transition-colors duration-150"
            >
              <Menu size={24} />
            </button>
          )}
          
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-300 text-white mr-3">
              <Heart size={20} fill="white" />
            </div>
            <h1 className="text-xl font-display font-semibold text-primary-800">WedPlan AI</h1>
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 text-sm text-gray-600 hidden md:block">
            <span className="font-medium">Sarah & Mike's Wedding</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent-200 flex items-center justify-center text-accent-800 border-2 border-white cursor-pointer hover:border-accent-300 transition-all duration-150">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;