import { useState, useEffect } from 'react'

import smugHarpy from './assets/Harpy Smile.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/CS4091/Team_R_REPO" target="_blank">
          <img src={smugHarpy} className="logo" alt="Harpy Logo" />
        </a>
      </div>
      <h1>Welcome!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Insert message here!
        </p>
      </div>
    </>
  )
}

export default App
