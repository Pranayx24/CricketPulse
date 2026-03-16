import { NextResponse } from 'next/server';
export async function GET() {
  try {

    const res = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRIC_API_KEY}`
    );

    const data = await res.json();

    const matches = data.data?.map((match: any) => ({
      id: match.id,
      team1: {
        name: match.teams?.[0] || "Team 1",
        shortName: match.teams?.[0]?.slice(0,3).toUpperCase() || "T1",
        logo: "🏏",
        score: match.score?.[0]?.r ? `${match.score[0].r}/${match.score[0].w}` : "",
        overs: match.score?.[0]?.o ? `${match.score[0].o}` : ""
      },
      team2: {
        name: match.teams?.[1] || "Team 2",
        shortName: match.teams?.[1]?.slice(0,3).toUpperCase() || "T2",
        logo: "🏏",
        score: match.score?.[1]?.r ? `${match.score[1].r}/${match.score[1].w}` : "",
        overs: match.score?.[1]?.o ? `${match.score[1].o}` : ""
      },
      status: match.status || "LIVE",
      matchType: match.matchType || "T20",
      series: match.series || "International Match",
      date: match.date || new Date().toISOString(),
      result: match.status || "Match in progress"
    })) || [];

    return NextResponse.json({ success: true, data: matches });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
