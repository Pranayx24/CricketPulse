"use client"

import { useEffect, useState } from "react"

export default function MatchPage({ params }: any) {

  const API_KEY = "2bb0be13-6bdd-421f-9786-41f590656393"

  const [match,setMatch] = useState<any>(null)

  useEffect(()=>{

    fetch(`https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${params.id}`)
    .then(res=>res.json())
    .then(data=>{
      setMatch(data.data)
    })

  },[])

  if(!match){
    return(
      <div style={{padding:"40px",color:"white"}}>
        Loading match...
      </div>
    )
  }

  return(

    <div style={{padding:"40px",color:"white"}}>

      {/* MATCH HEADER */}

      <div
      style={{
        border:"2px solid red",
        padding:"25px",
        borderRadius:"12px",
        boxShadow:"0 0 20px rgba(255,0,0,0.6)",
        marginBottom:"30px"
      }}
      >

        <h1 style={{fontSize:"30px"}}>
          {match.name}
        </h1>

        <p style={{color:"#00ff88",fontSize:"18px"}}>
          {match.status}
        </p>

      </div>


      {/* TEAMS SECTION */}

      <div
      style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"20px",
        marginBottom:"30px"
      }}
      >

      {match.teamInfo?.map((team:any,index:number)=>(

        <div
        key={index}
        style={{
          border:"2px solid red",
          padding:"20px",
          borderRadius:"10px"
        }}
        >

        <h2>{team.name}</h2>

        </div>

      ))}

      </div>


      {/* MATCH INFO */}

      <div
      style={{
        border:"2px solid red",
        padding:"25px",
        borderRadius:"10px"
      }}
      >

      <h2 style={{marginBottom:"15px"}}>Match Information</h2>

      <p><b>Match Type:</b> {match.matchType}</p>
      <p><b>Venue:</b> {match.venue}</p>
      <p><b>Date:</b> {match.date}</p>

      </div>

    </div>

  )

}
