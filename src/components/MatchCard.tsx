import Link from 'next/link';

export type Match = {
  id: string;
  team1: { name: string; shortName: string; logo: string; score: string; overs: string };
  team2: { name: string; shortName: string; logo: string; score: string; overs: string };
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  matchType: string;
  series: string;
  date: string;
  result: string;
};

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === 'LIVE';
  
  return (
    <Link href={`/match/${match.id}`} className="block">
      <div className="card-stadium rounded-xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 relative group overflow-hidden">
        {/* Animated gradient for Live matches */}
        {isLive && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-primary to-secondary animate-pulse" />
        )}
        
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700/50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{match.matchType} • {match.series}</span>
          {isLive ? (
             <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
               LIVE
             </span>
          ) : (
             <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{match.status}</span>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl" title={match.team1.name}>{match.team1.logo}</span>
              <span className="font-bold text-lg">{match.team1.shortName}</span>
            </div>
            <div className="text-right">
              {match.team1.score && <span className="font-bold text-lg block">{match.team1.score}</span>}
              {match.team1.overs && <span className="text-xs text-gray-400 block">({match.team1.overs} ov)</span>}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl" title={match.team2.name}>{match.team2.logo}</span>
              <span className="font-bold text-lg">{match.team2.shortName}</span>
            </div>
            <div className="text-right">
              {match.team2.score ? <span className="font-bold text-lg block">{match.team2.score}</span> : <span className="text-sm text-gray-500 italic">Yet to bat</span>}
              {match.team2.overs && <span className="text-xs text-gray-400 block">({match.team2.overs} ov)</span>}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-700/50 flex justify-between items-center text-sm">
          <span className={`font-medium ${isLive ? 'text-primary' : 'text-gray-400'}`}>
            {match.result}
          </span>
          <span className="text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Match Center <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
