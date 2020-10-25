import { GameEndStatus } from '../../model/Game'

export interface EndGameInfoProps {
  gameEndStatus: GameEndStatus
  secondsElapsed: number
}
