import React from 'react'

import './header.css'

export const Header = React.memo(() => {
  return (
    <header className="header">
      <h1 className="header--title">Minesweeper</h1>
    </header>
  )
})
