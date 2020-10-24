import React, { useCallback } from 'react'

import { Bomb, Flag } from '../../../components/Icons'
import { PRIMARY_CLICK_STATUSES, SECONDARY_CLICK_STATUSES, VisibleCellStatus } from '../../../model/Game'

import { CellInfo } from '../interface'

import './cell.css'

const noop = () => {}

export const Cell = React.memo(
  ({
    visibleStatus,
    extra,
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
        return extra === 0 ? (
          <div {...commonProps} className="cell opened empty" />
        ) : (
          <div {...commonProps} className={`cell opened numbered numbered-${extra}`}>
            {extra}
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
            <Bomb fill="tomato" />
          </div>
        )

      case VisibleCellStatus.Closed:
        return <div {...commonProps} className="cell closed" />

      case VisibleCellStatus.ShowMine:
        return (
          <div {...commonProps} className="cell mine">
            <Bomb />
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
