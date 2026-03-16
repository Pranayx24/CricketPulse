"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {

  const [matches,setMatches] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  const fetchMatches = async () => {

    try{

      const res = await fetch("/api/matches")

      const data = await res.json()

      setMatches(data.data || [])
      setLoading(false)

    }catch(err){

      console.log("API error:",err)
      setLoading(false)

    }

  }

  useEffect(()=>{

    fetchMatches()

    const interval = setInterval(()=>{
      fetchMatches()
    },60000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div style={{padding:"40px",background:"#000",minHeight:"100vh"}}>

      <h1 style={{
        fontSize:"40px",
        marginBottom:"30px",
        color:"#ffffff"
      }}>
        Live Cricket Center
      </h1>

      {loading && (
        <p style={{color:"#00ff88"}}>
          Loading live matches...
        </p>
      )}

      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
        gap:"25px"
      }}
      >

      {matches.map((match,index)=>{

        return(

        <Link key={index} href={`/match/${match.id}`} style={{textDecoration:"none"}}>

        <div
        style={{
          border:"2px solid red",
          padding:"22px",
          borderRadius:"14px",
          boxShadow:"0 0 15px rgba(255,0,0,0.6)",
          cursor:"pointer",
          background:"#000"
        }}
        >

        <h2 style={{
          color:"#ffffff",
          marginBottom:"10px"
        }}>
          {match.name}
        </h2>

        <p style={{
          color:"#00ff88",
          fontWeight:"bold"
        }}>
          {match.status}
        </p>

        <div style={{marginTop:"10px"}}>

        <p style={{color:"#ccc"}}>
          🏏 Type: {match.matchType}
        </p>

        <p style={{color:"#ccc"}}>
          📍 Venue: {match.venue}
        </p>

        <p style={{color:"#ccc"}}>
          📅 Date: {match.date}
        </p>

        </div>

        </div>

        </Link>

        )

      })}

      </div>

    </div>

  )

}
