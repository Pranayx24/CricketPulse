"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function MatchDetails(){

const params = useParams()
const matchId = params.id

const [match,setMatch] = useState<any>(null)
const [loading,setLoading] = useState(true)

const API_KEY = "2bb0be13-6bdd-421f-9786-41f590656393"

const fetchMatch = async () => {

try{

const res = await fetch(
`https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${matchId}`
)

const data = await res.json()

setMatch(data.data)
setLoading(false)

}catch(err){

console.log("Error loading match")

}

}

useEffect(()=>{

fetchMatch()

const interval = setInterval(()=>{

fetchMatch()

},30000)

return ()=>clearInterval(interval)

},[])

if(loading){

return(
<div style={{padding:"40px"}}>
<p style={{color:"#00ff88"}}>Loading match...</p>
</div>
)

}

return(

<div style={{padding:"40px"}}>

<h1 style={{fontSize:"35px"}}>
{match.name}
</h1>

<p style={{color:"#00ff88",marginBottom:"20px"}}>
{match.status}
</p>

<div
style={{
border:"2px solid red",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 0 15px rgba(255,0,0,0.6)"
}}
>

<h2>Match Info</h2>

<p>Type: {match.matchType}</p>

<p>Venue: {match.venue}</p>

<p>Date: {match.date}</p>

<p>Toss: {match.tossWinner}</p>

</div>

<br/>

<div
style={{
border:"2px solid red",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 0 15px rgba(255,0,0,0.6)"
}}
>

<h2>Teams</h2>

<p>{match.teams?.[0]}</p>
<p>{match.teams?.[1]}</p>

</div>

<br/>

<div
style={{
border:"2px solid red",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 0 15px rgba(255,0,0,0.6)"
}}
>

<h2>Score</h2>

{match.score?.map((s:any,index:number)=>(
<div key={index}>

<p>
{s.inning} : {s.r}/{s.w} ({s.o} overs)
</p>

</div>
))}

</div>

</div>

)

}
