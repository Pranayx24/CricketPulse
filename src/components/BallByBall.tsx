import React from 'react';

type BallByBallProps = {
  recentBalls: string[];
  commentary: { over: string; ball: string; description: string }[];
};

export default function BallByBall({ recentBalls, commentary }: BallByBallProps) {
  
  const getBallColorClass = (outcome: string) => {
    if (outcome === 'W') return 'bg-red-500 text-white';
    if (outcome === '4') return 'bg-blue-500 text-white';
    if (outcome === '6') return 'bg-purple-500 text-white';
    if (outcome === '0') return 'bg-gray-700 text-gray-300';
    return 'bg-gray-800 text-gray-200 border border-gray-700';
  };

  return (
    <div className="card-stadium rounded-xl p-5 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Deliveries</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {recentBalls.map((ball, idx) => (
            <div 
              key={idx} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md shrink-0 ${getBallColorClass(ball)}`}
            >
              {ball}
            </div>
          ))}
          <div className="text-xs text-gray-500 ml-2 italic">...most recent</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Live Commentary</h3>
        <div className="space-y-4">
          {commentary.map((comm, idx) => {
             const isWicket = comm.ball === 'W';
             const isBoundary = comm.ball === '4' || comm.ball === '6';
             return (
              <div key={idx} className={`p-4 rounded-lg flex gap-4 ${isWicket ? 'bg-red-500/10 border-l-4 border-red-500' : isBoundary ? 'bg-blue-500/10 border-l-4 border-blue-500' : 'bg-gray-800/30'}`}>
                <div className="font-mono text-sm font-bold text-gray-400 shrink-0 w-12 text-center pt-0.5">
                  {comm.over}
                </div>
                <div>
                  <div className="text-gray-300 text-sm">{comm.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
