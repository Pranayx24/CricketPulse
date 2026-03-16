import { NextResponse } from "next/server";

export async function GET() {
  try {

<<<<<<< HEAD
  const res = await fetch(
=======
    const res = await fetch(
>>>>>>> 28729f3 (Connected CricAPI live matches)
      "https://api.cricapi.com/v1/currentMatches?apikey=2bb0be13-6bdd-421f-9786-41f590656393"
    );

    const json = await res.json();

    const matches = (json.data || []).map((match: any) => ({
      id: match.id,

      team1: {
        name: match.teams?.[0] || "Team 1",
        shortName: match.teams?.[0]?.slice(0,3).toUpperCase() || "T1",
        logo: "🏏",
        score: match.score?.[0]
          ? `${match.score[0].r}/${match.score[0].w}`
          : "",
        overs: match.score?.[0]
          ? `${match.score[0].o}`
          : ""
      },

      team2: {
        name: match.teams?.[1] || "Team 2",
        shortName: match.teams?.[1]?.slice(0,3).toUpperCase() || "T2",
        logo: "🏏",
        score: match.score?.[1]
          ? `${match.score[1].r}/${match.score[1].w}`
          : "",
        overs: match.score?.[1]
          ? `${match.score[1].o}`
          : ""
      },

      status: match.status,
      matchType: match.matchType,
      series: match.name,
      date: match.date,
      result: match.status
    }));

    return NextResponse.json({
      success: true,
      data: matches
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Failed to fetch matches"
    });

  }
}
