import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavigationItems = () => (
    <>
      <Link
        to="/"
        className={`${
          isActive("/") ? "text-primary font-medium" : "text-muted-foreground"
        } hover:text-primary transition-colors`}
      >
        Home
      </Link>
      <Link
        to="/properties"
        className={`${
          isActive("/properties")
            ? "text-primary font-medium"
            : "text-muted-foreground"
        } hover:text-primary transition-colors`}
      >
        Properties
      </Link>
      <Link
        to="/agents"
        className={`${
          isActive("/agents")
            ? "text-primary font-medium"
            : "text-muted-foreground"
        } hover:text-primary transition-colors`}
      >
        Agents
      </Link>
      <Link
        to="/contact"
        className={`${
          isActive("/contact")
            ? "text-primary font-medium"
            : "text-muted-foreground"
        } hover:text-primary transition-colors`}
      >
        Contact
      </Link>
    </>
  );

  return (
    <header
      className={`bg-background sticky top-0 z-50 w-full ${
        scrolled ? "border-b" : ""
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              fill="currentColor"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.2251,128l24.8872-24.88721a43.99978,43.99978,0,1,0-62.2246-62.22558L128,65.7749,103.1123,40.88745a43.9997,43.9997,0,1,0-62.2246,62.22534L65.7749,128,40.8877,152.88721a43.99978,43.99978,0,1,0,62.2246,62.22558L128,190.2251l24.8877,24.88769a43.99978,43.99978,0,1,0,62.2246-62.22558ZM169.8584,57.85791v-.00024a19.99967,19.99967,0,1,1,28.2832,28.28442L173.25439,111.0293,144.9707,82.74561ZM156.28369,128,128,156.28369,99.71631,128,128,99.71631ZM57.8584,86.14209A19.99959,19.99959,0,1,1,86.1416,57.85791l24.8877,24.8877L82.74561,111.0293Zm28.2832,112a19.99959,19.99959,0,1,1-28.2832-28.28418L82.74561,144.9707l28.28369,28.28369Zm112,0a19.9986,19.9986,0,0,1-28.2832,0l-24.8877-24.8877,28.28369-28.28369,24.88721,24.88721a19.9986,19.9986,0,0,1,0,28.28418Z" />
            </svg>
            <span className="text-xl font-bold tracking-tight">
              Urban Square
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationItems />
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <img
                      src={user?.avatar || "https://via.placeholder.com/40"}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {(user?.role === "agent" || user?.role === "admin") && (
                    <DropdownMenuItem asChild>
                      <Link to="/my-properties">My Properties</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/favorites">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                <NavigationItems />
                {isAuthenticated ? (
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center space-x-4 pb-4 border-b">
                      <img
                        src={user?.avatar || "https://via.placeholder.com/40"}
                        alt="User avatar"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Link to="/dashboard" className="block">
                        Dashboard
                      </Link>
                    </SheetClose>
                    {(user?.role === "agent" || user?.role === "admin") && (
                      <SheetClose asChild>
                        <Link to="/my-properties" className="block">
                          My Properties
                        </Link>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Link to="/favorites" className="block">
                        Favorites
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/profile" className="block">
                        Profile
                      </Link>
                    </SheetClose>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
