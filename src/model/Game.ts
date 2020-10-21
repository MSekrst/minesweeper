export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Extreme = 'extreme',
  // TODO: add custom settings
  // Custom = 'custom',
}

export enum GameStatus {
  NotStarted = 'notStarted',
  ToBeStarted = 'toBeStarted', // game started but no fields clicked
  InProgress = 'inProgress',
  Won = 'won', // user cleared all mines
  Killed = 'killed', // user clicked mine
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
  // TODO: add doubtful status
  // Doubtful = 'doubtful',
}

export const PRIMARY_CLICK_STATUSES = [VisibleCellStatus.Opened, VisibleCellStatus.Closed]

export const SECONDARY_CLICK_STATUSES = [VisibleCellStatus.Closed, VisibleCellStatus.Marked]
