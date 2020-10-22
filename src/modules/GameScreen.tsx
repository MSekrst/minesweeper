import React, { useCallback, useState } from 'react'

import { Difficulty, GameStatus, IN_PROGRESS_STATUSES } from '../model/Game'
import { difficulties } from '../model/const'
import { Button } from '../components/Button'

import { DifficultyPicker } from './DifficultyPicker'
import { Game } from './Game'

export function GameScreen() {
  // TODO: load previous difficulty
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NotStarted)
  const [startTimestamp, setStartTimestamp] = useState<number>(Date.now())

  const handleGameStart = useCallback(() => {
    setGameStatus(GameStatus.ToBeStarted)

    setStartTimestamp(Date.now())
  }, [])

  const handleTryAgain = useCallback(() => {
    setGameStatus(GameStatus.NotStarted)
  }, [])

  const handleGameEnd = useCallback(
    (status: GameStatus) => {
      // TODO: better handlers (toast?) and leaderboard entry

      if (status === GameStatus.Killed) {
        console.log(`You died :(`)
      }

      if (status === GameStatus.Won) {
        const now = Date.now()

        const secondsElapsed = (now - startTimestamp) / 1000

        console.log(`You have won in ${secondsElapsed}s`)
      }
    },
    [startTimestamp]
  )

  const isInProgress = IN_PROGRESS_STATUSES.includes(gameStatus)
  const difficultyInfo = difficulty && difficulties.find(d => d.value === difficulty)

  return (
    <div>
      {isInProgress ? (
        <Button onClick={handleTryAgain}>Try Again</Button>
      ) : (
        <>
          <DifficultyPicker selected={difficulty} onChange={setDifficulty} />

          <Button disabled={!difficulty} onClick={handleGameStart}>
            Start game
          </Button>
        </>
      )}

      {isInProgress && difficultyInfo && <Game onStatusChange={handleGameEnd} {...difficultyInfo.parameters} />}
    </div>
  )
}
