import React from 'react'

import './button.css'

interface ButtonProps {
  children: React.ReactChild
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  value?: string
  className?: string
  style?: React.CSSProperties
}

export const Button = React.memo(({ children, className = '', ...props }: ButtonProps) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
))
