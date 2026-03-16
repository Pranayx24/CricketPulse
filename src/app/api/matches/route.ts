import { NextResponse } from "next/server"

export async function GET() {

  const API_KEY = "c891e91b67msh96cb4cbc6dd46d0p1348bdjsn123a3c78711e"

  try {

    const res = await fetch(
      "https://cricket-api-free-data.p.rapidapi.com/cricket-matches",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "cricket-api-free-data.p.rapidapi.com"
        }
      }
    )

    const data = await res.json()

    return NextResponse.json({
      data: data?.data || data?.matches || []
    })

  } catch (error) {

    return NextResponse.json({
      data: [],
      error: "Failed to fetch matches"
    })

  }

}
