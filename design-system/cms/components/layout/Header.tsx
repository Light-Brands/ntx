import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-3">
          
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full bg-secondary/50 pl-9 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden border">
            <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;