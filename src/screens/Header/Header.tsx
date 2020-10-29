import React, { useCallback, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../../components/Button'

import { Flag, Menu } from '../../components/Icons'

import './header.css'

const HEADER_ID = 'header-menu'

export const Header = React.memo(() => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuVisible(state => !state)
  }, [])

  /**
   * Track click event to determine if click was outside the mobile menu component -> close menu
   */
  const handleClick = useCallback((e: MouseEvent) => {
    // let element = e.target as HTMLElement | null

    setIsMenuVisible(false)
  }, [])

  // place click handler on document
  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('click', handleClick)
    }

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [isMenuVisible, handleClick])

  return (
    <header className="header">
      <div>
        <Link className="header--home" to="/">
          <Flag size={24} />
          <h1 className="header--title">Minesweeper</h1>
        </Link>
      </div>

      {/* Big screen */}
      <div className="header--links">
        <NavLink className="header--link big" to="/">
          Game
        </NavLink>
        <NavLink className="header--link big" to="/help">
          Help
        </NavLink>
        <NavLink className="header--link big" to="/leaderboard">
          Leaderboard
        </NavLink>
      </div>

      {/* Mobile */}
      <div className="header--menu" id={HEADER_ID}>
        <Button className={`menu-button ${isMenuVisible ? 'active' : ''}`} onClick={toggleMenu}>
          <Menu />
        </Button>

        {isMenuVisible && (
          <div className="menu">
            <Link className="header--link" to="/">
              Game
            </Link>
            <Link className="header--link" to="/help">
              Help
            </Link>
            <Link className="header--link" to="/leaderboard">
              Leaderboard
            </Link>
          </div>
        )}
      </div>
    </header>
  )
})
