import React, { useCallback, useState } from 'react'

import './game.css'

import { CellStatus, GameStatus, VisibleCellStatus } from '../../model/Game'
import { Cell } from './Cell/Cell'

import {
  generateGameBoard,
  propagateToEmpty,
  validateBoard,
  getNeighbours,
  countMarkedMines,
  countMarkedNeighbors,
} from './helpers'
import { CellInfo } from './interface'

const noop = () => {}

export function Game({
  onStatusChange,
  mines,
  width,
  height,
  helpers,
}: {
  onStatusChange: (status: GameStatus) => void
  mines: number
  width: number
  height: number
  helpers?: number
}) {
  const [board, setBoard] = useState(generateGameBoard(width, height, mines))
  const [isFinished, setIsFinished] = useState(false)
  const [helpersAvailable, setHelpersAvailable] = useState(helpers || 0)

  const openMineCell = useCallback(
    (x: number, y: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Exploded

      newBoard = validateBoard(newBoard)

      setBoard(newBoard)
      setIsFinished(true)

      return onStatusChange(GameStatus.Killed)
    },
    [board, onStatusChange]
  )

  const openClearCell = useCallback(
    (x: number, y: number, neighborMines: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Opened

      if (neighborMines === 0) {
        newBoard = propagateToEmpty(newBoard, { x, y, maxX: height - 1, maxY: width - 1 })
      }

      let implicitMines = 0

      newBoard.forEach(row =>
        row.forEach(cell => {
          if (cell.visibleStatus === VisibleCellStatus.Closed || cell.visibleStatus === VisibleCellStatus.Marked) {
            implicitMines += 1
          }
        })
      )

      if (implicitMines === mines) {
        setIsFinished(true)

        newBoard = validateBoard(newBoard)
        setBoard(newBoard)

        return onStatusChange(GameStatus.Won)
      } else {
        setBoard(newBoard)
      }
    },
    [board, onStatusChange, height, width, mines]
  )

  const openNeighbors = useCallback(
    (x: number, y: number, neighborMines: number) => {
      const markedNeighbors = countMarkedNeighbors(board, { x, y, maxX: width - 1, maxY: height - 1 })

      // open only if all mines marked -> can be wrong marked!
      if (markedNeighbors === neighborMines) {
        const neighbors = getNeighbours({ x, y, maxX: width - 1, maxY: height - 1 })
        const closedNeighbors = neighbors.filter(
          candidate => board[candidate.x][candidate.y].visibleStatus === VisibleCellStatus.Closed
        )

        for (let i = 0; i < closedNeighbors.length; i += 1) {
          const candidate = closedNeighbors[i]
          const cell = board[candidate.x][candidate.y]

          if (cell.status === CellStatus.Mine) {
            openMineCell(candidate.x, candidate.y)
            return
          } else if (cell.status === CellStatus.Clear) {
            openClearCell(candidate.x, candidate.y, cell.mines!)
          }
        }
      }
    },
    [board, height, width, openMineCell, openClearCell]
  )

  const openDefusedMineCell = useCallback(
    (x: number, y: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Defused

      setBoard(newBoard)
    },
    [board]
  )

  const handleMainAction = useCallback(
    (x: number, y: number, cell: CellInfo) => () => {
      const { visibleStatus, status, mines } = cell

      if (visibleStatus === VisibleCellStatus.Helper) {
        if (status === CellStatus.Mine) {
          openDefusedMineCell(x, y)
        } else {
          openClearCell(x, y, mines!)
        }
      } else if (status === CellStatus.Mine) {
        openMineCell(x, y)
      } else if (visibleStatus === VisibleCellStatus.Closed) {
        openClearCell(x, y, mines!)
      } else if (visibleStatus === VisibleCellStatus.Opened && mines! > 0) {
        openNeighbors(x, y, mines!)
      }
    },
    [openMineCell, openClearCell, openNeighbors, openDefusedMineCell]
  )

  const handleSecondaryAction = useCallback(
    (x: number, y: number, cell: CellInfo) => () => {
      let newBoard = [...board]

      const { visibleStatus } = cell

      if (visibleStatus === VisibleCellStatus.Helper) {
        newBoard[x][y].visibleStatus = VisibleCellStatus.Closed

        // return helper as it is not used
        setHelpersAvailable(helpersAvailable + 1)

        return setBoard(newBoard)
      }

      if (visibleStatus === VisibleCellStatus.Marked) {
        if (helpersAvailable) {
          newBoard[x][y].visibleStatus = VisibleCellStatus.Helper

          // assign only available helpers
          setHelpersAvailable(helpersAvailable - 1)
        } else {
          newBoard[x][y].visibleStatus = VisibleCellStatus.Closed
        }

        return setBoard(newBoard)
      }

      if (visibleStatus === VisibleCellStatus.Closed) {
        newBoard[x][y].visibleStatus = VisibleCellStatus.Marked

        return setBoard(newBoard)
      }
    },

    [board, helpersAvailable]
  )

  const nonMarkedMines = mines - countMarkedMines(board)

  return (
    <>
      <div className="board-counters">
        <span className="board--counter--label">Mines Left:</span>
        <span className="board--counter mines">{nonMarkedMines}</span>
        <span className="board--counter--label">Helpers left:</span>
        <span className="board--counter helpers">{helpersAvailable}</span>
      </div>

      <div className="board--window">
        <main className="board" style={{ width: 28 * width }}>
          {board.map((rows, rowIndex) => (
            <section key={rowIndex} className="row">
              {rows.map((cell, columnIndex) => {
                const mainClick = isFinished ? noop : handleMainAction(rowIndex, columnIndex, cell)
                const secondaryClick = isFinished ? noop : handleSecondaryAction(rowIndex, columnIndex, cell)

                // TODO: consider sending coordinates to allow memoization
                return <Cell key={columnIndex} {...cell} onSecondaryClick={secondaryClick} onClick={mainClick} />
              })}
            </section>
          ))}
        </main>
      </div>
    </>
  )
}
