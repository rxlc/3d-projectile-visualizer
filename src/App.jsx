import ThreeScene from './ThreeScene'
import Focus from './Components/Focus'
import Bluetooth from './Components/Bluetooth'
import Terminal from './Components/Terminal'

function App() {
  return (
    <div className="App">
      <Focus/>
      <Bluetooth/>
      <Terminal/>
      <ThreeScene/>
    </div>
  )
}

export default App
