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
      <div style={{padding:"40px"}}>
      Loading match...
      </div>
    )
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>{match.name}</h1>

      <h2 style={{color:"#00ff88"}}>
      {match.status}
      </h2>

      <br/>

      <p>Match Type: {match.matchType}</p>
      <p>Venue: {match.venue}</p>
      <p>Date: {match.date}</p>

      <br/>

      <h2>Teams</h2>

      {match.teamInfo?.map((team:any,index:number)=>(
        <p key={index}>{team.name}</p>
      ))}

    </div>

  )

}
