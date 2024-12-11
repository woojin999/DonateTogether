import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-12 text-center">
        <p className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} Donate Together. All Rights Reserved.
        </p>
        <div className="mt-4">
          <Link to="/" className="text-gray-400 hover:text-white mx-2">
            Home
          </Link>
          <Link to="/campaign" className="text-gray-400 hover:text-white mx-2">
          Campaign
          </Link>
          <Link to="/mydonate" className="text-gray-400 hover:text-white mx-2">
          Mydonate
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
