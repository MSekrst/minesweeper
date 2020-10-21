import React, { useCallback, useState } from 'react'

import './game.css'

import { CellStatus, GameStatus, VisibleCellStatus } from '../../model/Game'
import { Cell } from './Cell/Cell'

import { generateGameBoard, propagateToEmpty, validateBoard, getNeighbours } from './helpers'
import { CellInfo } from './interface'

const noop = () => {}

export function Game({
  onStatusChange,
  mines,
  width,
  height,
}: {
  onStatusChange: (status: GameStatus) => void
  mines: number
  width: number
  height: number
}) {
  const [board, setBoard] = useState(generateGameBoard(width, height, mines))
  const [isFinished, setIsFinished] = useState(false)

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
      const neighbors = getNeighbours({ x, y, maxX: width - 1, maxY: height - 1 })

      const markedNeighbors = neighbors.filter(
        candidate => board[candidate.x][candidate.y].visibleStatus === VisibleCellStatus.Marked
      )

      // open only if all mines marked -> can be wrong marked!
      if (markedNeighbors.length === neighborMines) {
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
            openClearCell(candidate.x, candidate.y, cell.extra!)
          }
        }
      }
    },
    [board, height, width, openMineCell, openClearCell]
  )

  const handleMainAction = useCallback(
    (x: number, y: number, cell: CellInfo) => () => {
      const { visibleStatus, status, extra } = cell

      if (status === CellStatus.Mine) {
        openMineCell(x, y)
      } else if (visibleStatus === VisibleCellStatus.Closed) {
        openClearCell(x, y, extra!)
      } else if (visibleStatus === VisibleCellStatus.Opened && extra! > 0) {
        openNeighbors(x, y, extra!)
      }
    },
    [openMineCell, openClearCell, openNeighbors]
  )

  const handleSecondaryAction = useCallback(
    (x: number, y: number, cell: CellInfo) => () => {
      let newBoard = [...board]

      const { visibleStatus } = cell

      if (visibleStatus === VisibleCellStatus.Marked) {
        newBoard[x][y].visibleStatus = VisibleCellStatus.Closed

        return setBoard(newBoard)
      }

      if (visibleStatus === VisibleCellStatus.Closed) {
        newBoard[x][y].visibleStatus = VisibleCellStatus.Marked

        return setBoard(newBoard)
      }
    },

    [board]
  )

  console.log({ board, mines, width, height })

  return (
    <main className="board">
      {board.map((rows, rowIndex) => {
        return (
          <section key={rowIndex} className="row">
            {rows.map((cell, columnIndex) => {
              // TODO: fast open action on number click
              const mainClick = isFinished ? noop : handleMainAction(rowIndex, columnIndex, cell)
              const secondaryClick = isFinished ? noop : handleSecondaryAction(rowIndex, columnIndex, cell)

              // TODO: consider sending coordinates to allow memoization
              return <Cell key={columnIndex} {...cell} onSecondaryClick={secondaryClick} onClick={mainClick} />
            })}
          </section>
        )
      })}
    </main>
  )
}
