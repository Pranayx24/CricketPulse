import { NextResponse } from 'next/server';

// Detailed mock data for a single match scorecard
const generateMockScorecard = (id: string) => {
  return {
    id,
    matchInfo: {
      team1: { name: 'England', shortName: 'ENG', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '145/2', overs: '15.4' },
      team2: { name: 'South Africa', shortName: 'RSA', logo: '🇿🇦', score: '220/8', overs: '20.0' },
      status: 'LIVE',
      matchType: 'T20',
      toss: 'England won the toss and elected to field',
      venue: 'Lord\'s Cricket Ground, London',
      requiredRunRate: '17.53',
      currentRunRate: '9.25',
      result: 'ENG need 76 runs in 26 balls'
    },
    batting: [
      { name: 'Jos Buttler', runs: 65, balls: 40, fours: 6, sixes: 3, strikeRate: 162.5, status: 'not out' },
      { name: 'Phil Salt', runs: 45, balls: 25, fours: 5, sixes: 2, strikeRate: 180.0, status: 'c Miller b Rabada' },
      { name: 'Will Jacks', runs: 25, balls: 15, fours: 3, sixes: 1, strikeRate: 166.6, status: 'b Nortje' },
      { name: 'Jonny Bairstow', runs: 8, balls: 6, fours: 1, sixes: 0, strikeRate: 133.3, status: 'not out' }
    ],
    bowling: [
      { name: 'Kagiso Rabada', overs: 3.4, maidens: 0, runs: 28, wickets: 1, economy: 7.6 },
      { name: 'Anrich Nortje', overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
      { name: 'Lungi Ngidi', overs: 3, maidens: 0, runs: 40, wickets: 0, economy: 13.3 },
      { name: 'Tabraiz Shamsi', overs: 3, maidens: 0, runs: 32, wickets: 0, economy: 10.6 },
      { name: 'Keshav Maharaj', overs: 2, maidens: 0, runs: 10, wickets: 0, economy: 5.0 }
    ],
    recentBalls: ['1', '4', 'W', '0', '2', '6'],
    commentary: [
        { over: '15.4', ball: '6', description: 'Rabada to Bairstow, SIX! What a shot to finish the over.' },
        { over: '15.3', ball: '2', description: 'Rabada to Bairstow, 2 runs, drilled down the ground.' },
        { over: '15.2', ball: '0', description: 'Rabada to Bairstow, no run, well bowled.' },
        { over: '15.1', ball: 'W', description: 'Rabada to Jacks, OUT! Bowled him.' },
    ]
  };
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const matchDetails = generateMockScorecard(id);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({ success: true, data: matchDetails });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch match details' }, { status: 500 });
  }
}
