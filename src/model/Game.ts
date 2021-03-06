export enum Difficulty {
  Beginner = 'beginner',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Extreme = 'extreme',
  // TODO: add custom difficulty setting
  // Custom = 'custom',
}

export enum GameStatus {
  NotStarted = 'notStarted',
  ToBeStarted = 'toBeStarted', // game started but no fields clicked
  InProgress = 'inProgress',
}

export enum GameEndStatus {
  Won = 'won', // user cleared all mines
  Killed = 'killed', // user clicked a mine
}

export const IN_PROGRESS_STATUSES = [GameStatus.ToBeStarted, GameStatus.InProgress]

/**
 * Cell statuses are determined before game starts. They cannot be changed in game.
 */
export enum CellStatus {
  Mine = 'mine',
  Clear = 'clear',
}

/**
 * Visible statuses can be changed based on user's interaction.
 * e.g. Open empty cell, mark mine, etc.
 */
export enum VisibleCellStatus {
  Closed = 'closed',
  Marked = 'mineMarked',
  Exploded = 'mineExploded',
  Opened = 'opened',
  WrongMarked = 'wrong',
  ShowMine = 'show',
  Helper = 'helper',
  Defused = 'defused',
}

export const PRIMARY_CLICK_STATUSES = [VisibleCellStatus.Opened, VisibleCellStatus.Closed, VisibleCellStatus.Helper]

export const SECONDARY_CLICK_STATUSES = [VisibleCellStatus.Closed, VisibleCellStatus.Marked, VisibleCellStatus.Helper]

export const MINE_COUNT_STATUSES = [VisibleCellStatus.Marked, VisibleCellStatus.Defused]

export interface GameParameters {
  mines: number
  width: number
  height: number
  helpers?: number
}
