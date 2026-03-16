import Link from 'next/link';
import { Menu, Search, Trophy } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-gray-800 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Trophy className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            CricketPulse Live
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Live Matches</Link>
          <Link href="/series" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Series</Link>
          <Link href="/teams" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Teams</Link>
          <Link href="/news" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">News</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className="md:hidden text-gray-400 hover:text-white" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
