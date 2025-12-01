import React from 'react';
import { Home, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, theme, toggleTheme, onLogout }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between mb-6 gap-4">
        {/* Left Side: Home Link */}
        <a 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </a>

        {/* Right Side: Controls */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user && (
            <div className="flex items-center pl-3 border-l border-gray-200 dark:border-gray-700 space-x-3">
              <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 overflow-hidden flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        user.name.charAt(0).toUpperCase()
                    )}
                 </div>
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                    {user.name}
                 </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 pb-1">
          MGKVP MBA AI PREP
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Your intelligent study companion. Select your course and keywords to generate detailed notes instantly.
        </p>
      </div>
    </div>
  );
};

export default Header;
