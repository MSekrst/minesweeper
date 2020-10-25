import React, { useCallback, useEffect, useState } from 'react'

import { Difficulty, GameStatus, IN_PROGRESS_STATUSES } from '../../model/Game'
import { difficulties } from '../../model/const'
import { Button } from '../../components/Button'

import { DifficultyPicker } from '../../modules/DifficultyPicker'
import { Game } from '../../modules/Game'
import { useStoredState } from '../../utils/useStoredState'

import './gameScreen.css'

export function GameScreen() {
  const [difficulty, setDifficulty] = useStoredState<Difficulty>('difficulty')
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NotStarted)
  const [startTimestamp, setStartTimestamp] = useState<number>(Date.now())

  const [isRestarted, setIsRestarted] = useState<boolean>(false)

  const handleGameStart = useCallback(() => {
    setGameStatus(GameStatus.ToBeStarted)

    setStartTimestamp(Date.now())
  }, [])

  const handleChangeDifficulty = useCallback(() => {
    setGameStatus(GameStatus.NotStarted)
  }, [])

  const handleGameRestart = useCallback(() => {
    setGameStatus(GameStatus.NotStarted)

    setIsRestarted(true)
  }, [])

  useEffect(() => {
    if (isRestarted) {
      setIsRestarted(false)

      handleGameStart()
    }
  }, [handleGameStart, isRestarted])

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
      <div className="game-screen--difficulty">
        <DifficultyPicker disabled={isInProgress} selected={difficulty} onChange={setDifficulty} />
      </div>

      <div className="game-screen--buttons">
        {isInProgress ? (
          <>
            <Button onClick={handleChangeDifficulty}>Go back</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleGameRestart}>
              Restart
            </Button>
          </>
        ) : (
          <>
            <Button disabled={!difficulty} onClick={handleGameStart}>
              Start game
            </Button>
          </>
        )}
      </div>

      {isInProgress && difficultyInfo && <Game onStatusChange={handleGameEnd} {...difficultyInfo.parameters} />}
    </div>
  )
}
