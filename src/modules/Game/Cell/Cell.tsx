import React, { useCallback } from 'react'

import { Mine, Flag, Help } from '../../../components/Icons'
import { PRIMARY_CLICK_STATUSES, SECONDARY_CLICK_STATUSES, VisibleCellStatus } from '../../../model/Game'

import { CellInfo } from '../interface'

import './cell.css'

const noop = () => {}

export const Cell = React.memo(
  ({
    visibleStatus,
    mines,
    onClick,
    onSecondaryClick,
  }: CellInfo & { onClick: () => void; onSecondaryClick: () => void }) => {
    const handleContextMenu = useCallback(
      (e: React.MouseEvent<HTMLTableDataCellElement>) => {
        e.preventDefault()
        e.stopPropagation()

        onSecondaryClick()
      },
      [onSecondaryClick]
    )

    const hasPrimaryClick = PRIMARY_CLICK_STATUSES.includes(visibleStatus)

    const hasSecondaryClick = SECONDARY_CLICK_STATUSES.includes(visibleStatus)

    const commonProps = {
      onClick: hasPrimaryClick ? onClick : noop,
      onContextMenu: hasSecondaryClick ? handleContextMenu : noop,
    }

    switch (visibleStatus) {
      case VisibleCellStatus.Opened:
        return mines === 0 ? (
          <div {...commonProps} className="cell opened empty" />
        ) : (
          <div {...commonProps} className={`cell opened numbered numbered-${mines}`}>
            {mines}
          </div>
        )

      case VisibleCellStatus.Marked:
        return (
          <div {...commonProps} className="cell marked">
            <Flag />
          </div>
        )

      case VisibleCellStatus.Exploded:
        return (
          <div {...commonProps} className="cell opened exploded">
            <Mine fill="tomato" />
          </div>
        )

      case VisibleCellStatus.Helper:
        return (
          <div {...commonProps} className="cell helper">
            <Help />
          </div>
        )

      case VisibleCellStatus.Defused:
        return (
          <div {...commonProps} className="cell opened defused">
            <Flag fill="green" />
          </div>
        )

      case VisibleCellStatus.Closed:
        return <div {...commonProps} className="cell closed" />

      case VisibleCellStatus.ShowMine:
        return (
          <div {...commonProps} className="cell mine">
            <Mine />
          </div>
        )

      case VisibleCellStatus.WrongMarked:
        return (
          <div {...commonProps} className="cell wrong">
            <Flag fill="black" />
          </div>
        )

      default:
        throw Error('Invalid cell state')
    }
  }
)
