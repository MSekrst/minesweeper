import React from 'react'

import { Difficulty } from './Game'

export const difficulties = [
  {
    label: (
      <div>
        <strong>Beginner</strong> - <i>10 x 10</i> - 10 mines
      </div>
    ),
    value: Difficulty.Beginner,
    parameters: { mines: 10, width: 10, height: 10, helpers: 1 },
    // 10%
  },
  {
    label: (
      <div>
        <strong>Easy</strong> - <i>14 x 14</i> - 30 mines
      </div>
    ),
    value: Difficulty.Easy,
    parameters: { mines: 30, width: 14, height: 14, helpers: 2 },
    // 15.03%
  },
  {
    label: (
      <div>
        <strong>Medium</strong> - <i>16 x 20</i> - 50 mines
      </div>
    ),
    value: Difficulty.Medium,
    parameters: { mines: 50, width: 14, height: 20, helpers: 2 },
    // 17.85%
  },
  {
    label: (
      <div>
        <strong>Hard</strong> - <i>20 x 25</i> - 100 mines
      </div>
    ),
    value: Difficulty.Hard,
    parameters: { mines: 100, width: 20, height: 25, helpers: 3 },
    // 19.23%
  },
  {
    label: (
      <div>
        <strong>Extreme</strong> - <i>20 x 30</i> - 150 mines
      </div>
    ),
    value: Difficulty.Extreme,
    parameters: { mines: 150, width: 20, height: 38, helpers: 3 },
    // 19.74%
  },
]
