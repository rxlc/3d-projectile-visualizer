import ThreeScene from './ThreeScene'

import LaunchPanel from './Components/LaunchPanel'
import Focus from './Components/Focus'
import Projectiles from './Components/Projectiles'


function App() {

  return (
    <div className="App" style={{display: "flex", width: window.innerWidth, height: window.innerHeight, alignItems: "center", justifyItems:"center"}}>
      <LaunchPanel/>
      <Focus/>
      <Projectiles/>
      <ThreeScene/>
    </div>
  )
}

export default App
