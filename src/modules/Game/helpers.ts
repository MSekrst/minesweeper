import { CellStatus, VisibleCellStatus } from '../../model/Game'
import { CellInfo } from './interface'

function generateEmptyBoard(width: number, height: number) {
  const board = [] as CellInfo[][]

  for (let x = 0; x < height; x += 1) {
    const row = []

    for (let y = 0; y < width; y += 1) {
      row.push({ visibleStatus: VisibleCellStatus.Closed, status: CellStatus.Clear })
    }

    board.push(row)
  }

  return board
}

function fillMines(board: CellInfo[][], mines: number) {
  const heightMaxIndex = board.length - 1
  const widthMaxIndex = board[0].length - 1

  let minesRemaining = mines

  while (minesRemaining !== 0) {
    const x = Math.floor(Math.random() * heightMaxIndex)
    const y = Math.floor(Math.random() * widthMaxIndex)

    if (board[x][y].status === CellStatus.Clear) {
      board[x][y].status = CellStatus.Mine
      minesRemaining -= 1
    }
  }

  return board
}

interface GetNeighborsArgs {
  x: number
  y: number
  maxX: number
  maxY: number
}

function fillMinesInfo(board: CellInfo[][]) {
  const maxX = board.length - 1
  const maxY = board[0].length - 1

  for (let x = 0; x < board.length; x += 1) {
    const row = board[x]

    for (let y = 0; y < row.length; y += 1) {
      const cell = row[y]

      if (cell.status === CellStatus.Mine) {
        continue
      }

      const neighbours = getNeighbours({ x, y, maxX, maxY })

      let minesCount = 0

      neighbours.forEach(candidate => {
        if (board[candidate.x][candidate.y].status === CellStatus.Mine) {
          minesCount += 1
        }
      })

      board[x][y].extra = minesCount
    }
  }

  return board
}

export function getNeighbours({ x, y, maxX, maxY }: GetNeighborsArgs) {
  const neighbors = []

  for (let i = x - 1; i <= x + 1; i += 1) {
    if (i < 0 || i > maxX) {
      continue
    }

    for (let j = y - 1; j <= y + 1; j += 1) {
      if (j < 0 || j > maxY) {
        continue
      }

      if (i === x && j === y) {
        continue
      }

      neighbors.push({ x: i, y: j })
    }
  }

  return neighbors
}

export function propagateToEmpty(board: CellInfo[][], params: GetNeighborsArgs) {
  const neighbors = getNeighbours(params)

  const emptyNeighbors = neighbors.filter(candidate => {
    const cell = board[candidate.x][candidate.y]

    return cell.visibleStatus === VisibleCellStatus.Closed && cell.status === CellStatus.Clear
  })

  emptyNeighbors.forEach(candidate => {
    const cell = board[candidate.x][candidate.y]

    board[candidate.x][candidate.y].visibleStatus = VisibleCellStatus.Opened

    if (cell.extra === 0) {
      propagateToEmpty(board, { ...params, x: candidate.x, y: candidate.y })
    }
  })

  return board
}

export function generateGameBoard(width: number, height: number, mines: number) {
  return fillMinesInfo(fillMines(generateEmptyBoard(width, height), mines))
}

export function validateBoard(board: CellInfo[][]) {
  for (let x = 0; x < board.length; x += 1) {
    const row = board[x]

    for (let y = 0; y < row.length; y += 1) {
      const cell = row[y]

      if (cell.status === CellStatus.Mine && cell.visibleStatus === VisibleCellStatus.Closed) {
        board[x][y].visibleStatus = VisibleCellStatus.ShowMine
        continue
      }

      if (cell.status === CellStatus.Clear && cell.visibleStatus === VisibleCellStatus.Marked) {
        board[x][y].visibleStatus = VisibleCellStatus.WrongMarked
        continue
      }
    }
  }

  return board
}
