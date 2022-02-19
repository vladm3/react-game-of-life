import { useCallback, useEffect, useState } from 'react';
import useInterval from '../useInterval';
import { BoardState, createNextGeneration, createRandomBoard } from './gameLogic';

const useGame = (width: number, height: number, iterationDelay: number) => {
  const [generationNumber, setGenerationNumber] = useState(1);
  const [board, setBoard] = useState<BoardState>([]);
  const [playing, setPlaying] = useState(false);

  const reset = useCallback(() => {
    setPlaying(false);
    setGenerationNumber(1);
    setBoard(createRandomBoard(width, height));
  }, [width, height]);

  // reset board when width or height of board changes. see reset deps.
  useEffect(() => {
    reset();
  }, [reset]);

  const iterateBoard = () => {
    setGenerationNumber(generationNumber + 1);
    setBoard(createNextGeneration(board));
  };

  useInterval(
    () => {
      iterateBoard();
    },
    playing ? iterationDelay : undefined,
  );

  return {
    generationNumber,
    board,
    playing,
    setPlaying,
    reset,
  };
};

export default useGame;
