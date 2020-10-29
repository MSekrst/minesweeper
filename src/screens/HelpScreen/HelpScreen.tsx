import React from 'react'

import { CellStatus, VisibleCellStatus } from '../../model/Game'
import { GameCell } from '../../modules/Game'
import { Mine, Flag, Help } from '../../components/Icons'

import './help.css'

const noop = () => {}

const cellProps = { onClick: noop, onSecondaryClick: noop }

export const HelpScreen = React.memo(() => {
  return (
    <div className="help-page">
      <h1 id="help">Help</h1>
      <p>
        Down bellow players can find useful information regarding the Minesweeper game.
        <br />
        <br />
        <a href="#basics">Basics section</a> explains the basic principles.
        <br />
        <br />
        <a href="#controls">Controls section</a> explains the game controls principles.
        <br />
        <br />
        <a href="#controls">Helpers section</a> explains the game helpers.
        <br />
        <br />
        <a href="#graphics">Graphics section</a> explains the game graphics in depth.
      </p>

      <h2 id="basics">
        Basics <a href="#basics">#</a> <a href="#help">&uarr;</a>
      </h2>
      <p>
        Goal of a Minesweeper game is to <strong>open all non mined cells</strong> in the field. To do so, players are
        given clues about mines positions.
        <br />
        Each <strong>cell is either mined or clear</strong>. Opening <strong>mined cell</strong>(<Mine fill="tomato" />)
        results in a <strong>death</strong> - and that is a game over for the player. Opening{' '}
        <strong>clear cell provides extra information.</strong> Clear cell can contain{' '}
        <strong>number from 1 to 8</strong>, which represents <strong>number of mines in adjacent cells</strong>. Clear
        cell can also be empty, meaning that opened cell has no adjacent mines.
        <br />
        <i>
          Opening empty cell trigger automatic opening of all adjacent cells to speed up the game as adjacent cells are
          safe to open.
        </i>{' '}
        <strong>
          Players can mark mine fields with flags (<Flag />
          ).
        </strong>{' '}
        More about flags and other controls in <a href="#controls">controls</a> section.
      </p>

      <h2 id="controls">
        Controls <a href="#controls">#</a> <a href="#help">&uarr;</a>
      </h2>
      <div>
        Player has <strong>two controls available</strong>:{' '}
        <ol>
          <li>
            Opening a cell <i>(left click / tap)</i>
          </li>
          <li>
            Marking a cell <i>(right click / long press)</i>
          </li>
        </ol>
        Opening the cell is main operation and can not be reversed. Marking the cell is reversible and player can mark
        and re-mark the same cell multiple times if needed.
        <br />
        <strong>Cell is opened with a left click, or a tap</strong>, depending on the device used.
        <br />
        <strong>Cell is marked with a right click, or a long press</strong>, depending on the device used.
        <br />
        <strong>Marking already marked cell will change the initial marking or clear all markings</strong>.
        <br />
        <i>
          Opened clear cells with numbers in them can be clicked if all their mines are marked. This action will open
          all adjacent not marked cells, but be careful, if mines are not correctly marked, it will result in a game
          over.
        </i>
      </div>

      <h2 id="helpers">
        Helpers <a href="#helpers">#</a> <a href="#help">&uarr;</a>
      </h2>
      <p>
        <strong>Helper is a special cell marking type</strong>, which represents professional mine defusing expert who
        can open a cell without dying even if cell contains mine.{' '}
        <strong>Players can use helper to safety check the cell.</strong> Helper is deployed by{' '}
        <strong>marking the cell</strong> with helper icon(
        <Help />) and <strong>then opening the cell</strong> (using main action described in{' '}
        <a href="#controls">controls</a> section). <strong>Helper will either open the cell</strong>, if the cell is
        clear, <strong> or open the cell</strong> with special helper(
        <Flag fill="green" />) flag, if a cell is mined. <br />
        <strong>Number of helpers used in a single game is restricted</strong> and depends on the difficulty selected,
        so <i>players are advised to save helpers for situations when they are needed to stay safe.</i>
      </p>

      <h2 id="graphics">
        Graphics <a href="#graphics">#</a> <a href="#help">&uarr;</a>
      </h2>
      <div>
        Basic graphics elements were discussed is other sections. This section will provide detailed graphics
        explanations.
        <br />
        <ul>
          <h4>While game in progress</h4>

          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Closed} status={CellStatus.Clear} />
            <span className="help-list--label"> - Closed cell</span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Opened} status={CellStatus.Clear} mines={0} />
            <span className="help-list--label"> - Opened cell (empty)</span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Opened} status={CellStatus.Clear} mines={3} />
            <span className="help-list--label"> - Opened cell (3 adjacent mines)</span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Marked} status={CellStatus.Mine} />
            <span className="help-list--label"> - Mine marked cell </span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Helper} status={CellStatus.Mine} />
            <span className="help-list--label"> - Helper marked cell </span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Defused} status={CellStatus.Mine} />
            <span className="help-list--label"> - Helper defused cell </span>
          </li>

          <h4>After game has finished</h4>

          <p>Some in game icons are also visible.</p>

          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Exploded} status={CellStatus.Mine} />
            <span className="help-list--label"> - Exploded mine (opening this cell resulted in game over) </span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.ShowMine} status={CellStatus.Mine} />
            <span className="help-list--label"> - Not exploded mine (shows where mines were) </span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.Marked} status={CellStatus.Mine} />
            <span className="help-list--label"> - Correctly marked mine</span>
          </li>
          <li className="help-list--item">
            <GameCell {...cellProps} visibleStatus={VisibleCellStatus.WrongMarked} status={CellStatus.Mine} />
            <span className="help-list--label"> - Wrongly marked mine</span>
          </li>
        </ul>
      </div>
    </div>
  )
})
