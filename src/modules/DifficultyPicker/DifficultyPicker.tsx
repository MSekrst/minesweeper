import React, { useCallback } from 'react'

import { Difficulty } from '../../model/Game'
import { difficulties } from '../../model/const'
import { RadioGroup } from '../../components/Radio'

export function _DifficultyPicker({
  selected,
  onChange,
}: {
  selected?: Difficulty
  onChange: (difficulty: Difficulty) => void
}) {
  const handleChange = useCallback(
    (newDifficulty: string) => {
      onChange(newDifficulty as Difficulty)
    },
    [onChange]
  )

  return (
    <RadioGroup
      name="difficulty"
      label="Choose difficulty"
      options={difficulties}
      selectedValue={selected}
      onChange={handleChange}
    />
  )
}

export const DifficultyPicker = React.memo(_DifficultyPicker)
