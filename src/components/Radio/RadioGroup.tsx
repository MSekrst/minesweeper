import React, { useCallback } from 'react'
import { RadioButton } from './RadioButton'

import './radioGroup.css'

interface Option {
  value: string
  label: React.ReactChild
}

interface RadioGroupProps {
  name: string
  label: React.ReactChild
  onChange: (selectedValue: string) => void
  options: Option[]
  selectedValue?: string
}

export const RadioGroup = React.memo(({ name, label, options, onChange, selectedValue }: RadioGroupProps) => {
  const handleRadioButtonChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value)
    },
    [onChange]
  )

  return (
    <div className="radio-group">
      <div className="radio-group--label">{label}</div>
      {options.map(o => (
        <RadioButton
          key={o.value}
          label={o.label}
          name={name}
          value={o.value}
          checked={selectedValue === o.value}
          onChange={handleRadioButtonChange}
        />
      ))}
    </div>
  )
})
