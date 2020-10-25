import React from 'react'
import { GameEndStatus } from '../../model/Game'

import { EndGameInfoProps } from './interface'

import './endGame.css'

export const EndGameInfo = React.memo(({ gameEndStatus, secondsElapsed }: EndGameInfoProps) => {
  const hasWon = gameEndStatus === GameEndStatus.Won

  const message = hasWon ? 'won' : 'died'

  return (
    <div className="end-game">
      <div className={`end-game--message ${message}`}>You {message}!</div>
      <div className="end-game--timer">Game timer: {secondsElapsed}s</div>
    </div>
  )
})
