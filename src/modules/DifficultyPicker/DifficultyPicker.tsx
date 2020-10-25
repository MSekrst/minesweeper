import React, { useCallback } from 'react'

import { Difficulty } from '../../model/Game'
import { difficulties } from '../../model/const'
import { RadioGroup } from '../../components/Radio'

import './difficultyPicker.css'

export const DifficultyPicker = React.memo(
  ({
    selected,
    onChange,
    disabled,
  }: {
    selected?: Difficulty
    onChange: (difficulty: Difficulty) => void
    disabled?: boolean
  }) => {
    const handleChange = useCallback(
      (newDifficulty: string) => {
        onChange(newDifficulty as Difficulty)
      },
      [onChange]
    )

    if (disabled) {
      const playingDifficulty = difficulties.find(d => d.value === selected)

      if (!playingDifficulty) {
        return null
      }

      return (
        <div className="difficulty-picker">
          <div className="difficulty-picker--label">{playingDifficulty.label}</div>
        </div>
      )
    }

    return (
      <div className="difficulty-picker">
        <RadioGroup
          name="difficulty"
          label="Choose difficulty"
          options={difficulties}
          selectedValue={selected}
          onChange={handleChange}
        />
      </div>
    )
  }
)
