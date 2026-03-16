import { NextResponse } from "next/server"

export async function GET() {

  const API_KEY = "2bb0be13-6bdd-421f-9786-41f590656393"

  const res = await fetch(
    `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`,
    {
      next: { revalidate: 60 } // cache for 60 seconds
    }
  )

  const data = await res.json()

  return NextResponse.json(data)

}
