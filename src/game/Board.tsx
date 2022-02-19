import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Board.module.css';
import { BoardState, CellState } from './gameLogic';

export interface BoardProps {
  state: BoardState;
}

// wrap Board in memo because it's re-rendering is expensive
const Board: FC<BoardProps> = React.memo(({ state }) => {
  const renderCells = () => {
    return state.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.boardRow}>
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={classNames(
              styles.boardCell,
              cell === CellState.Alive && styles.boardCellActive,
            )}
          />
        ))}
      </div>
    ));
  };

  return <div className={styles.board}>{renderCells()}</div>;
});

// provide component name for dev tools
Board.displayName = 'BoardMemo';

export default Board;
