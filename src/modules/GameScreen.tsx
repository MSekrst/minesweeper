import React, { useCallback, useState } from 'react'
import { difficulties } from '../model/const'

import { Difficulty, GameStatus, IN_PROGRESS_STATUSES } from '../model/Game'

import { DifficultyPicker } from './DifficultyPicker'
import { Game } from './Game'

export function GameScreen() {
  // TODO: load previous difficulty
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NotStarted)
  const [startTimestamp, setStartTimestamp] = useState<number>(Date.now())
  // const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
  // const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ToBeStarted)
  // const [startTimestamp, setStartTimestamp] = useState<number>(Date.now())

  const handleGameStart = useCallback(() => {
    setGameStatus(GameStatus.ToBeStarted)

    setStartTimestamp(Date.now())
  }, [])

  const handleTryAgain = useCallback(() => {
    setGameStatus(GameStatus.NotStarted)
  }, [])

  const handleGameEnd = useCallback((status: GameStatus) => {
    console.log(`Game ended with status: ${status}`)

    // TODO: use better end game handlers and timers

    if (status === GameStatus.Killed) {
      alert('Better luck next time')
    }

    if (status === GameStatus.Won) {
      alert('You won')
    }
  }, [])

  const isInProgress = IN_PROGRESS_STATUSES.includes(gameStatus)
  const difficultyInfo = difficulty && difficulties.find(d => d.value === difficulty)

  return (
    <div>
      <h1>Welcome</h1>

      {isInProgress ? (
        <button onClick={handleTryAgain}>Try Again</button>
      ) : (
        <>
          <DifficultyPicker selected={difficulty} onChange={setDifficulty} />

          <button disabled={!difficulty} onClick={handleGameStart}>
            Start game
          </button>

          <br />
        </>
      )}

      {isInProgress && difficultyInfo && <Game onStatusChange={handleGameEnd} {...difficultyInfo.parameters} />}
    </div>
  )
}
