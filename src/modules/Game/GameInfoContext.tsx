import React from 'react'

import { GameParameters, GameStatus } from '../../model/Game'

interface GameInfoContextType {
  gameStatus: GameStatus
  gameParameters: GameParameters
}

export const GameInfoContext = React.createContext<GameInfoContextType>({
  gameStatus: GameStatus.NotStarted,
  gameParameters: { height: 0, width: 0, mines: 0 },
})

export const GameInfoProvider = GameInfoContext.Provider
