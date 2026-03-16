import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "CricketPulse",
  description: "Live Cricket Scores",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <nav
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"20px",
          borderBottom:"1px solid #222",
          marginBottom:"30px"
        }}
        >

          <h2 style={{color:"white"}}>CricketPulse Live</h2>

          <div style={{display:"flex",gap:"25px"}}>

            <Link href="/" style={{color:"white"}}>Live Matches</Link>
            <Link href="/series" style={{color:"white"}}>Series</Link>
            <Link href="/teams" style={{color:"white"}}>Teams</Link>
            <Link href="/news" style={{color:"white"}}>News</Link>

          </div>

        </nav>

        {children}

      </body>
    </html>
  )
}
