import React from 'react'
import { Link } from 'react-router-dom'

import { Flag } from '../../components/Icons'

import './header.css'

export const Header = React.memo(() => {
  return (
    <header className="header">
      <Link className="header--home" to="/">
        <Flag size={24} />
        <h1 className="header--title">Minesweeper</h1>
      </Link>
    </header>
  )
})
