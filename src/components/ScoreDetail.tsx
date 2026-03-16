import React from 'react';

type ScorecardProps = {
  batting: { name: string; runs: number; balls: number; fours: number; sixes: number; strikeRate: number; status: string }[];
  bowling: { name: string; overs: number; maidens: number; runs: number; wickets: number; economy: number }[];
};

export default function ScoreDetail({ batting, bowling }: ScorecardProps) {
  return (
    <div className="space-y-6">
      <div className="card-stadium rounded-xl overflow-hidden border border-gray-800">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-lg text-primary">Batting</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-gray-900/50">
              <tr>
                <th scope="col" className="px-4 py-3">Batter</th>
                <th scope="col" className="px-4 py-3 text-right">R</th>
                <th scope="col" className="px-4 py-3 text-right">B</th>
                <th scope="col" className="px-4 py-3 text-right">4s</th>
                <th scope="col" className="px-4 py-3 text-right">6s</th>
                <th scope="col" className="px-4 py-3 text-right">SR</th>
              </tr>
            </thead>
            <tbody>
              {batting.map((batter, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{batter.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{batter.status}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-white">{batter.runs}</td>
                  <td className="px-4 py-3 text-right">{batter.balls}</td>
                  <td className="px-4 py-3 text-right">{batter.fours}</td>
                  <td className="px-4 py-3 text-right">{batter.sixes}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{batter.strikeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-stadium rounded-xl overflow-hidden border border-gray-800">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-700">
            <h3 className="font-bold text-lg text-secondary">Bowling</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-gray-900/50">
              <tr>
                <th scope="col" className="px-4 py-3">Bowler</th>
                <th scope="col" className="px-4 py-3 text-right">O</th>
                <th scope="col" className="px-4 py-3 text-right">M</th>
                <th scope="col" className="px-4 py-3 text-right">R</th>
                <th scope="col" className="px-4 py-3 text-right font-bold text-white">W</th>
                <th scope="col" className="px-4 py-3 text-right">ECON</th>
              </tr>
            </thead>
            <tbody>
              {bowling.map((bowler, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{bowler.name}</td>
                  <td className="px-4 py-3 text-right">{bowler.overs}</td>
                  <td className="px-4 py-3 text-right">{bowler.maidens}</td>
                  <td className="px-4 py-3 text-right">{bowler.runs}</td>
                  <td className="px-4 py-3 text-right font-bold text-primary">{bowler.wickets}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{bowler.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
