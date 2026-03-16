"use client"

import { useEffect, useState } from "react"

export default function Home() {

  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMatches = async () => {
    try {

      const res = await fetch(
        "https://api.cricapi.com/v1/currentMatches?apikey=2bb0be13-6bdd-421f-9786-41f590656393&offset=0"
      )

      const data = await res.json()

      if (data && data.data) {
        setMatches(data.data)
      }

      setLoading(false)

    } catch (error) {
      console.log("API Error:", error)
    }
  }

  useEffect(() => {

    fetchMatches()

    const interval = setInterval(() => {
      fetchMatches()
    }, 15000)

    return () => clearInterval(interval)

  }, [])

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Live Cricket Center
      </h1>

      {loading && (
        <p>Loading live matches...</p>
      )}

      {!loading && matches.length === 0 && (
        <p>No live matches right now.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        {matches.map((match, index) => (

          <div
            key={index}
            className="card-stadium p-5 rounded-xl border border-red-500 shadow-lg"
          >

            <h2 className="text-xl font-bold mb-2">
              {match.name}
            </h2>

            <p className="text-green-400 mb-2">
              {match.status}
            </p>

            <p className="text-gray-400 text-sm">
              Match Type: {match.matchType}
            </p>

            <p className="text-gray-400 text-sm">
              Venue: {match.venue}
            </p>

            <p className="text-gray-400 text-sm">
              Date: {match.date}
            </p>

          </div>

        ))}

      </div>

    </main>

  )
}
