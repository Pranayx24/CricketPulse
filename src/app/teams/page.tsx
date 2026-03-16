"use client"

import { useEffect,useState } from "react"

export default function Teams(){

const [teams,setTeams] = useState<any[]>([])

useEffect(()=>{

fetch("https://api.cricapi.com/v1/teams?apikey=2bb0be13-6bdd-421f-9786-41f590656393")
.then(res=>res.json())
.then(data=>setTeams(data.data || []))

},[])

return(

<div style={{padding:"40px"}}>

<h1 style={{fontSize:"40px",marginBottom:"30px"}}>Cricket Teams</h1>

{teams.map((team,index)=>(

<div key={index}
style={{
border:"2px solid red",
padding:"20px",
marginBottom:"20px",
borderRadius:"12px",
boxShadow:"0 0 15px rgba(255,0,0,0.6)"
}}
>

<h3>{team.name}</h3>

<p>Country: {team.country}</p>

</div>

))}

</div>

)

}
