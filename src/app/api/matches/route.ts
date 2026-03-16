import { NextResponse } from 'next/server';

// Mock data generator for matches to simulate free API without rate limits
const generateMockMatches = () => {
  return [
    {
      id: 'm1',
      team1: { name: 'India', shortName: 'IND', logo: '🇮🇳', score: '210/4', overs: '20.0' },
      team2: { name: 'Australia', shortName: 'AUS', logo: '🇦🇺', score: '205/6', overs: '20.0' },
      status: 'FINISHED',
      matchType: 'T20',
      series: 'IND vs AUS T20 Series',
      date: new Date().toISOString(),
      result: 'India won by 5 runs'
    },
    {
      id: 'm2',
      team1: { name: 'England', shortName: 'ENG', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '145/2', overs: '15.4' },
      team2: { name: 'South Africa', shortName: 'RSA', logo: '🇿🇦', score: '220/8', overs: '20.0' },
      status: 'LIVE',
      matchType: 'T20',
      series: 'World Cup 2026',
      date: new Date().toISOString(),
      result: 'ENG need 76 runs in 26 balls'
    },
    {
      id: 'm3',
      team1: { name: 'Pakistan', shortName: 'PAK', logo: '🇵🇰', score: '', overs: '' },
      team2: { name: 'New Zealand', shortName: 'NZ', logo: '🇳🇿', score: '', overs: '' },
      status: 'UPCOMING',
      matchType: 'ODI',
      series: 'PAK vs NZ ODI Series',
      date: new Date(Date.now() + 86400000).toISOString(),
      result: 'Match starts tomorrow'
    }
  ];
};

export async function GET() {
  try {
    // In a real scenario, you would fetch from CricAPI or CricketData here
    // Example: const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRIC_API_KEY}`);
    
    // Using mock data to ensure the free requirement is met continuously
    const matches = generateMockMatches();
    
    // Simulate slight network delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch matches' }, { status: 500 });
  }
}
