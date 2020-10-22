import React from 'react'

import { GameScreen } from './screens/GameScreen'
import { Header } from './screens/Header'

import './base.css'

// TODO: add favicon

function App() {
  return (
    <>
      <Header />
      <main className="page-content">
        <GameScreen />
      </main>
    </>
  )
}

export default App
