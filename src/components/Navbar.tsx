
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-skillsync-purple text-white font-bold text-xl">S</div>
            <span className="font-bold text-xl text-skillsync-purple">SkillSync</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium hover:text-skillsync-purple transition-colors">
            Dashboard
          </Link>
          <Link to="/matches" className="text-sm font-medium hover:text-skillsync-purple transition-colors">
            Matches
          </Link>
          <Link to="/profile" className="text-sm font-medium hover:text-skillsync-purple transition-colors">
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-sm hover:text-skillsync-purple">
            Login
          </Button>
          <Button className="bg-skillsync-purple hover:bg-skillsync-light-purple">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
