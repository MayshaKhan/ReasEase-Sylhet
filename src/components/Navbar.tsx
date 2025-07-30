
import { Building2, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: "Home", href: "/", active: true },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">RealEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(0, 1).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-700"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Listings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors hover:text-orange-500 text-gray-700">
                Listings
                <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/buy" className="w-full">
                    Buy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rent" className="w-full">
                    Rent
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/sell" className="w-full">
                    Sell
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.slice(1).map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-700"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-orange-500 text-gray-700"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* User Menu or Login Button */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <UserAvatar 
                    avatarUrl={profile?.avatar_url} 
                    fullName={profile?.full_name}
                    size="sm"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="flex items-center text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.slice(0, 1).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Listings Submenu */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-700">Listings</div>
                <Link
                  to="/buy"
                  className="block px-6 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Buy
                </Link>
                <Link
                  to="/rent"
                  className="block px-6 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rent
                </Link>
                <Link
                  to="/sell"
                  className="block px-6 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell
                </Link>
              </div>

              {navItems.slice(1).map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-orange-500 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-3 py-2 text-base font-medium transition-colors text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="h-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Log in
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
