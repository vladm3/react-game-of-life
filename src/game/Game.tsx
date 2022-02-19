import { FC } from 'react';
import Board from './Board';
import styles from './Game.module.css';
import useGame from './useGame';

export interface GameProps {
  width: number;
  height: number;
  iterationDelay: number;
}

const Game: FC<GameProps> = ({ width, height, iterationDelay }) => {
  const { generationNumber, board, playing, setPlaying, reset } = useGame(
    width,
    height,
    iterationDelay,
  );

  return (
    <div className={styles.game}>
      <h2>Generation #{generationNumber}</h2>
      <Board state={board} />

      <div className={styles.gameControls}>
        <button
          disabled={playing}
          onClick={() => {
            setPlaying(true);
          }}
        >
          Play
        </button>
        <button
          disabled={!playing}
          onClick={() => {
            setPlaying(false);
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Game;
