import React from 'react'

import './radio.css'

interface RadioProps {
  name: string
  label: React.ReactChild
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  checked?: boolean
}

export const RadioButton = React.memo(({ label, ...props }: RadioProps) => (
  <label className="radio">
    <input type="radio" {...props} />
    <div className="radio-dot" />
    <div className="radio-label">{label}</div>
  </label>
))
