import React, { ChangeEvent, useCallback } from 'react'

import { Difficulty } from '../../model/Game'
import { difficulties } from '../../model/const'

export function _DifficultyPicker({
  selected,
  onChange,
}: {
  selected?: Difficulty
  onChange: (difficulty: Difficulty) => void
}) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value as Difficulty)
    },
    [onChange]
  )

  return (
    <div>
      <h3>Choose difficulty</h3>
      <br />
      {difficulties.map(({ label, value }) => (
        <label key={value}>
          <input type="radio" name="difficulty" value={value} checked={selected === value} onChange={handleChange} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  )
}

export const DifficultyPicker = React.memo(_DifficultyPicker)
