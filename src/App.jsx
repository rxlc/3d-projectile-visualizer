import { useState } from 'react'
import './App.css'
import ThreeScene from './ThreeScene'

function App() {
  let [count, setCount] = useState(0);

  return (
    <div className="App">
      <ThreeScene/>
    </div>
  )
}

export default App
