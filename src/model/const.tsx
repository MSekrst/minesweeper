import React from 'react'

import { Difficulty } from './Game'

export const difficulties = [
  {
    label: (
      <div>
        <strong>Easy</strong> <i>12 x 12 - 10 mines</i>
      </div>
    ),
    value: Difficulty.Easy,
    parameters: { mines: 10, width: 12, height: 12 },
  },
  {
    label: (
      <div>
        <strong>Medium</strong> <i>15 x 15 - 35 mines</i>
      </div>
    ),
    value: Difficulty.Medium,
    parameters: { mines: 35, width: 15, height: 15 },
  },
  {
    label: (
      <div>
        <strong>Hard</strong> <i>24 x 24 - 100 mines</i>
      </div>
    ),
    value: Difficulty.Hard,
    parameters: { mines: 100, width: 24, height: 24 },
  },
  {
    label: (
      <div>
        <strong>Extreme</strong> <i>30 x 30 - 200 mines</i>
      </div>
    ),
    value: Difficulty.Extreme,
    parameters: { mines: 200, width: 30, height: 30 },
  },
]
