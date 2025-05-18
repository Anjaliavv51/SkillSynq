
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, MessageSquare, Home, Activity, Users, Video, Calendar, Award, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from '@/utils/mockData';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = getCurrentUser();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">SkillSync</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/skill-progress" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Skill Progress</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track your skill improvement over time
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/group-learning" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Group Learning</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Participate in group study sessions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/gamification" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Gamification</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Earn badges and track achievements
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/video-chat" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Video Chat</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Connect face-to-face with learning partners
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/scheduling" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Scheduling</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Plan and organize learning sessions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/ai-tools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">AI Tools</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get AI-powered learning insights
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/matches" className="text-gray-600 hover:text-primary transition-colors">Matches</Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/chat" className="text-gray-600 hover:text-primary transition-colors">Chat</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/chat" className="flex items-center gap-2 cursor-pointer">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/logout" className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2 animate-in fade-in slide-in-from-top">
          <div className="flex flex-col space-y-3 py-3">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/matches" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-4 w-4" />
              Matches
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Link>
            <Link 
              to="/skill-progress" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Activity className="h-4 w-4" />
              Skill Progress
            </Link>
            <Link 
              to="/group-learning" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-4 w-4" />
              Group Learning
            </Link>
            <Link 
              to="/gamification" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Award className="h-4 w-4" />
              Gamification
            </Link>
            <Link 
              to="/video-chat" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Video className="h-4 w-4" />
              Video Chat
            </Link>
            <Link 
              to="/scheduling" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              Scheduling
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link 
              to="/logout" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
