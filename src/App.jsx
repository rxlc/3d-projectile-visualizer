import ThreeScene from './ThreeScene'

import LaunchPanel from './Components/LaunchPanel'
import Focus from './Components/Focus'
import Projectiles from './Components/Projectiles'

import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <div className="App" style={{display: "flex", width: window.innerWidth, height: window.innerHeight, alignItems: "center", justifyItems:"center"}}>
      <LaunchPanel/>
      <Focus/>
      <Projectiles/>
      <ThreeScene/>
      <Analytics />
    </div>
  )
}

export default App
