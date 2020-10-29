import React from 'react'

import './counters.css'

export const Counters = React.memo(
  ({ nonMarkedMines, helpersAvailable }: { nonMarkedMines: number; helpersAvailable: number }) => {
    return (
      <div className="counters">
        <span className="counter--label">Mines Left:</span>
        <span className="counter mines">{nonMarkedMines}</span>
        <span className="counter--label">Helpers left:</span>
        <span className="counter helpers">{helpersAvailable}</span>
      </div>
    )
  }
)
