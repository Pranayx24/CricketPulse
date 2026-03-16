'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScoreDetail from '@/components/ScoreDetail';
import BallByBall from '@/components/BallByBall';
import AdSlot from '@/components/AdSlot';
import { Match } from '@/components/MatchCard';

export default function MatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMatchDetail = async () => {
      try {
        const res = await fetch(`/api/match/${id}`);
        const data = await res.json();
        if (data.success && isMounted) {
          setMatchData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMatchDetail();
    // Refresh only if live
    const interval = setInterval(() => {
        if (matchData?.matchInfo?.status === 'LIVE') fetchMatchDetail();
    }, 10000); 

    return () => {
        isMounted = false;
        clearInterval(interval);
    };
  }, [id, matchData?.matchInfo?.status]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <div className="animate-pulse space-y-8">
             <div className="h-40 bg-gray-800/50 rounded-xl"></div>
             <div className="h-20 bg-gray-800/50 rounded-xl"></div>
             <div className="h-64 bg-gray-800/50 rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!matchData) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">Match Not Found</h1>
            <p className="text-gray-500 mt-2">The requested match details are unavailable.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { matchInfo, batting, bowling, recentBalls, commentary } = matchData;
  const isLive = matchInfo.status === 'LIVE';

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Top Ad unit */}
        <AdSlot type="banner" />

        {/* Match Header (similar to MatchCard but expanded) */}
        <div className="card-stadium rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl shadow-primary/5 border border-gray-700/50">
          
          {isLive && (
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-primary to-secondary animate-pulse" />
          )}

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-700/50 gap-4">
            <div className="text-center md:text-left">
               <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">{matchInfo.matchType}</span>
               <span className="text-sm font-medium text-gray-400">{matchInfo.toss}</span>
            </div>
            {isLive ? (
               <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                 MATCH IS LIVE
               </span>
            ) : (
               <span className="text-xs font-bold tracking-widest text-gray-400 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full">
                 {matchInfo.status}
               </span>
            )}
            <div className="text-xs text-gray-400 font-medium hidden md:block">{matchInfo.venue}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
              <span className="text-5xl" title={matchInfo.team1.name}>{matchInfo.team1.logo}</span>
              <h2 className="text-3xl font-extrabold text-white">{matchInfo.team1.shortName}</h2>
              <div className="font-mono text-2xl font-bold text-primary">{matchInfo.team1.score} <span className="text-sm text-gray-400 block font-sans font-medium">({matchInfo.team1.overs} ov)</span></div>
            </div>

            <div className="text-center flex flex-col items-center justify-center">
               <div className="text-4xl font-black text-gray-700 mb-2 italic">VS</div>
               {isLive && matchInfo.requiredRunRate && (
                  <div className="bg-gray-800/80 rounded-lg p-2 text-sm text-gray-300 w-full max-w-[200px] border border-gray-700">
                     <div className="flex justify-between mb-1">
                        <span>REQ RR:</span> <span className="font-bold text-white">{matchInfo.requiredRunRate}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>CUR RR:</span> <span className="font-bold text-white">{matchInfo.currentRunRate}</span>
                     </div>
                  </div>
               )}
            </div>

            <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
              <span className="text-5xl" title={matchInfo.team2.name}>{matchInfo.team2.logo}</span>
              <h2 className="text-3xl font-extrabold text-white">{matchInfo.team2.shortName}</h2>
              <div className="font-mono text-2xl font-bold text-secondary">
                 {matchInfo.team2.score ? matchInfo.team2.score : 'Yet to bat'} 
                 {matchInfo.team2.overs && <span className="text-sm text-gray-400 block font-sans font-medium">({matchInfo.team2.overs} ov)</span>}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-700/50 text-center text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            {matchInfo.result}
          </div>
        </div>

        {/* Square Ad slot in mobile, Banner in desktop */}
        <div className="mb-8 flex justify-center">
           <AdSlot type="banner" className="hidden md:flex" />
           <AdSlot type="square" className="md:hidden" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
             <ScoreDetail batting={batting} bowling={bowling} />
          </div>

          <div className="space-y-8">
            <BallByBall recentBalls={recentBalls} commentary={commentary} />
            
            <div className="card-stadium rounded-xl p-5 border border-gray-800 text-center">
                <h3 className="font-bold text-white mb-2">Get Match Updates</h3>
                <p className="text-sm text-gray-400 mb-4">Subscribe to receive push notifications for wickets and milestones.</p>
                <button className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-primary/20">
                    Enable Alerts 🔔
                </button>
            </div>
            
            <AdSlot type="square" />
          </div>
          
        </div>

      </main>
      
      {/* Sticky Bottom Ad space */}
      <div className="h-16 mt-8"></div>
      <AdSlot type="sticky-bottom" />
      <Footer />
    </>
  );
}
