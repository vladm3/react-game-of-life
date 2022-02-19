export enum CellState {
  Dead,
  Alive,
}

export type BoardState = CellState[][];

const createBoard = (width: number, height: number): BoardState =>
  Array(height)
    .fill(undefined)
    .map(() => Array(width).fill(CellState.Dead));

export const createRandomBoard = (width: number, height: number): BoardState => {
  const board = createBoard(width, height);

  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      board[row][col] = Math.random() < 0.7 ? CellState.Dead : CellState.Alive;
    }
  }

  return board;
};

const countNeighbors = (board: BoardState, row: number, col: number): number => {
  return (
    (board[row - 1]?.[col - 1] ?? 0) + // top left
    (board[row - 1]?.[col] ?? 0) + // top
    (board[row - 1]?.[col + 1] ?? 0) + // top right
    (board[row]?.[col + 1] ?? 0) + // right
    (board[row + 1]?.[col + 1] ?? 0) + // bottom right
    (board[row + 1]?.[col] ?? 0) + // bottom
    (board[row + 1]?.[col - 1] ?? 0) + // bottom left
    (board[row]?.[col - 1] ?? 0) // left
  );
};

export const createNextGeneration = (board: BoardState): BoardState => {
  const height = board.length;
  const width = board[0]?.length ?? 0;

  const nextBoard = createBoard(width, height);
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const neighbors = countNeighbors(board, row, col);
      nextBoard[row][col] =
        neighbors === 3 || (neighbors === 2 && board[row][col] === CellState.Alive)
          ? CellState.Alive
          : CellState.Dead;
    }
  }

  return nextBoard;
};
