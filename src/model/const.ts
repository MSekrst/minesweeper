import { Difficulty } from './Game'

// TODO: generate label
export const difficulties = [
  { label: 'Easy (12x12 - 10 mines)', value: Difficulty.Easy, parameters: { mines: 10, width: 12, height: 12 } },
  { label: 'Medium (15x15 - 35 mines)', value: Difficulty.Medium, parameters: { mines: 35, width: 15, height: 15 } },
  { label: 'Hard (24x24 - 100 mines)', value: Difficulty.Hard, parameters: { mines: 100, width: 24, height: 24 } },
  {
    label: 'Extreme (30x30 - 200 mines)',
    value: Difficulty.Extreme,
    parameters: { mines: 200, width: 30, height: 30 },
  },
]
