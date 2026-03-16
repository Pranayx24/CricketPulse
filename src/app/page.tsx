'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard, { Match } from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'LIVE' | 'UPCOMING' | 'FINISHED' | 'TRENDING'>('LIVE');

  useEffect(() => {
    let isMounted = true;
    
    const fetchMatches = async () => {
      try {
        const res = await fetch('/api/matches');
        const data = await res.json();
        if (data.success && isMounted) {
          setMatches(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 10000); // 10s auto-refresh
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredMatches = matches.filter((m) => {
    if (activeTab === 'TRENDING') return true; // Show all for trending as a placeholder
    return m.status === activeTab;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3">Live Cricket Center</h1>
          <p className="text-gray-400 text-sm md:text-lg">Fastest live scores, updates, and complete coverage.</p>
        </div>

        {/* Top Leaderboard Ad */}
        <AdSlot type="banner" />

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-800 mb-8 pt-4 pb-2 gap-8 hide-scrollbar">
          {['LIVE', 'UPCOMING', 'FINISHED', 'TRENDING'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 whitespace-nowrap font-semibold transition-all duration-300 border-b-2 text-sm md:text-base ${
                activeTab === tab 
                  ? 'border-primary text-primary tracking-wide' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }`}
            >
              {tab === 'LIVE' && activeTab === 'LIVE' && <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>}
              {tab.charAt(0) + tab.slice(1).toLowerCase()} Matches
            </button>
          ))}
        </div>

        {/* Match List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
               <div key={i} className="card-stadium h-56 animate-pulse rounded-xl bg-gray-800/50"></div>
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, index) => (
               <React.Fragment key={match.id}>
                 <MatchCard match={match} />
                 {/* Insert an ad between cards occasionally */}
                 {index === 2 && <div className="col-span-1 md:col-span-2 lg:col-span-3"><AdSlot type="banner" /></div>}
               </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 card-stadium rounded-xl border border-gray-800/50 flex flex-col items-center justify-center">
             <span className="text-6xl mb-4 opacity-50">🏏</span>
            <h3 className="text-2xl font-bold text-gray-300">No {activeTab.toLowerCase()} matches right now</h3>
            <p className="text-gray-500 mt-2">Check back later or view upcoming series.</p>
          </div>
        )}

      </main>
      
      {/* Sticky Bottom Ad space */}
      <div className="h-16 mt-8"></div>
      <AdSlot type="sticky-bottom" />
      <Footer />
    </>
  );
}
