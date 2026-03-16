import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-800 pt-10 pb-6 mt-12 pb-24 md:pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">CricketPulse Live</h3>
          <p className="text-sm text-gray-400">
            Fastest cricket score updates, live match center, stats, and news. Optimized for speed.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-primary transition-colors">Live Scores</Link></li>
            <li><Link href="/series" className="hover:text-primary transition-colors">Upcoming Series</Link></li>
            <li><Link href="/teams" className="hover:text-primary transition-colors">Teams</Link></li>
            <li><Link href="/players" className="hover:text-primary transition-colors">Player Rankings</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <p className="text-sm text-gray-400 mb-2">Advertise with us to reach millions of cricket fans.</p>
          <a href="mailto:ads@cricketpulse.live" className="text-primary hover:underline text-sm font-medium">ads@cricketpulse.live</a>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} CricketPulse Live. All rights reserved. Not affiliated with ICC or BCCI.
      </div>
    </footer>
  );
}
