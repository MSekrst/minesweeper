import React, { useCallback, useContext, useState } from 'react'

import './game.css'

import { CellStatus, GameEndStatus, VisibleCellStatus } from '../../model/Game'
import { Cell } from './Cell/Cell'

import {
  generateGameBoard,
  propagateToEmpty,
  validateBoard,
  getNeighbours,
  countMarkedMines,
  countMarkedNeighbors,
  countClearFields,
} from './helpers'
import { CellInfo } from './interface'

import { GameInfoContext } from './GameInfoContext'
import { Counters } from './Counters/Counters'

const noop = () => {}

export function Game({ onStatusChange }: { onStatusChange: (status: GameEndStatus) => void }) {
  const {
    gameParameters: { width, height, mines, helpers },
  } = useContext(GameInfoContext)

  const [board, setBoard] = useState(generateGameBoard(width, height, mines))
  const [isFinished, setIsFinished] = useState(false)
  // helpers are used to safely open field
  const [helpersAvailable, setHelpersAvailable] = useState(helpers || 0)

  /**
   * Handles game end scenario. Will reveal board and mark incorrectly marked cells.
   */
  const endGame = useCallback(
    (board: CellInfo[][], isWin?: boolean) => {
      let newBoard = [...board]

      newBoard = validateBoard(newBoard)

      setBoard(newBoard)
      setIsFinished(true)

      onStatusChange(isWin ? GameEndStatus.Won : GameEndStatus.Killed)
    },
    [onStatusChange]
  )

  /**
   * Handles mine click and calls end game handler.
   */
  const openMineCell = useCallback(
    (x: number, y: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Exploded

      endGame(newBoard)
    },
    [board, endGame]
  )

  /**
   * Handles clear cell click. If opened cell is empty, opens adjacent cells too.
   * Calls end game if needed.
   */
  const openClearCell = useCallback(
    (x: number, y: number, neighborMines: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Opened

      if (neighborMines === 0) {
        newBoard = propagateToEmpty(newBoard, { x, y, maxX: height - 1, maxY: width - 1 })
      }

      const clearCells = countClearFields(newBoard)
      const maximumClearCells = height * width - mines

      if (clearCells === maximumClearCells) {
        endGame(newBoard, true)
      } else {
        setBoard(newBoard)
      }
    },
    [board, height, width, mines, endGame]
  )

  /**
   * Handles adjacent cells reveal. Reveal will only happen if clicked cell has all its mines marked.
   * This operation can be dangerous for player, because if mines are wrongly marked it will result in game over.
   */
  const openNeighbors = useCallback(
    (x: number, y: number, neighborMines: number) => {
      const markedNeighbors = countMarkedNeighbors(board, { x, y, maxX: height - 1, maxY: width - 1 })

      // open only if all mines marked -> can be wrong marked!
      if (markedNeighbors === neighborMines) {
        const neighbors = getNeighbours({ x, y, maxX: height - 1, maxY: width - 1 })
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

  /**
   * Handles defused mine cell open. Player has used helper so this operation is safe.
   */
  const openDefusedMineCell = useCallback(
    (x: number, y: number) => {
      let newBoard = [...board]

      newBoard[x][y].visibleStatus = VisibleCellStatus.Defused

      setBoard(newBoard)
    },
    [board]
  )

  /**
   * Main handler for primary action (click / tap). Calls more specific handlers.
   */
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

  /**
   * Secondary action handler (right click / long press). Changes cell status (mine marked, helper, nothing).
   */
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
      <Counters helpersAvailable={helpersAvailable} nonMarkedMines={nonMarkedMines} />

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
