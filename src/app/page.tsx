"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {

  const API_KEY = "2bb0be13-6bdd-421f-9786-41f590656393"

  const [matches,setMatches] = useState<any[]>([])

  useEffect(()=>{

    fetch(`https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`)
    .then(res=>res.json())
    .then(data=>{
      setMatches(data.data || [])
    })

  },[])

  return(

    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"40px",marginBottom:"30px"}}>
        Live Cricket Center
      </h1>

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
          padding:"20px",
          borderRadius:"12px",
          boxShadow:"0 0 15px rgba(255,0,0,0.6)",
          cursor:"pointer"
        }}
        >

        <h3 style={{color:"white"}}>{match.name}</h3>

        <p style={{color:"#00ff88"}}>
        {match.status}
        </p>

        <p style={{color:"white"}}>
        Match Type: {match.matchType}
        </p>

        <p style={{color:"white"}}>
        Venue: {match.venue}
        </p>

        <p style={{color:"white"}}>
        Date: {match.date}
        </p>

        </div>

        </Link>

        )

      })}

      </div>

    </div>

  )

}
