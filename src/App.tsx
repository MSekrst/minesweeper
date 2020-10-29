import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { GameScreen } from './screens/GameScreen'
import { Header } from './screens/Header'
import { HelpScreen } from './screens/HelpScreen'
import { LeaderboardScreen } from './screens/LeaderboardScreen'
import { ErrorScreen } from './screens/ErrorScreen'

import './base.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-content">
        <Switch>
          <Route path="/" exact component={GameScreen} />
          <Route path="/help" exact component={HelpScreen} />
          <Route path="/leaderboard" exact component={LeaderboardScreen} />
          <Route component={ErrorScreen} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
