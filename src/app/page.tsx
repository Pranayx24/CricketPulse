"use client"

import { useEffect, useState } from "react"

export default function Home() {

  const API_KEY = "2bb0be13-6bdd-421f-9786-41f590656393"

  const [matches, setMatches] = useState([])
  const [tab, setTab] = useState("live")

  useEffect(() => {
    fetch(`https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`)
      .then(res => res.json())
      .then(data => {
        setMatches(data.data || [])
      })
  }, [])

  return (
    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"40px", marginBottom:"20px"}}>
        Live Cricket Center
      </h1>

      {/* TABS */}
      <div style={{
        display:"flex",
        gap:"20px",
        marginBottom:"30px",
        fontSize:"18px",
        cursor:"pointer"
      }}>
        <span onClick={()=>setTab("live")}>Live Matches</span>
        <span onClick={()=>setTab("upcoming")}>Upcoming Matches</span>
        <span onClick={()=>setTab("finished")}>Finished Matches</span>
        <span onClick={()=>setTab("trending")}>Trending Matches</span>
      </div>

      {/* MATCH GRID */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
        gap:"25px"
      }}>

        {matches.map((match:any,index)=>{

          if(tab==="live" && match.matchStarted===false) return null
          if(tab==="upcoming" && match.matchStarted===true) return null

          return (

            <div key={index}
            style={{
              border:"2px solid red",
              padding:"20px",
              borderRadius:"12px",
              boxShadow:"0 0 15px rgba(255,0,0,0.6)"
            }}>

              <h3>{match.name}</h3>

              <p style={{color:"#00ff88"}}>
                {match.status}
              </p>

              <p>Match Type: {match.matchType}</p>
              <p>Venue: {match.venue}</p>
              <p>Date: {match.date}</p>

            </div>

          )

        })}

      </div>

    </div>
  )
}
