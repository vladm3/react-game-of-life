import { CellState, createNextGeneration, createRandomBoard } from './gameLogic';

describe('gameLogic', () => {
  test('createRandomBoard returns a 2d array of specified dimensions filled with 0 or 1', () => {
    const h = 5;
    const w = 4;
    const board = createRandomBoard(w, h);

    // test height
    expect(board.length).toBe(h);

    // test width of each row
    board.forEach((row) => {
      expect(row.length).toBe(w);
    });

    // test each value
    board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell === CellState.Alive || cell === CellState.Dead).toBeTruthy();
      });
    });
  });

  test('live cell with fewer than two live neighbors dies (underpopulation)', () => {
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    expect(
      createNextGeneration([
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
    ).toEqual(expected);

    expect(
      createNextGeneration([
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 0],
      ]),
    ).toEqual(expected);
  });

  test('live cell with two or three live neighbors lives', () => {
    const expected = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];

    expect(
      createNextGeneration([
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]),
    ).toEqual(expected);
  });

  test('live cell with more than three live neighbors dies', () => {
    const expected = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];

    expect(
      createNextGeneration([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]),
    ).toEqual(expected);
  });

  test('any dead cell with exactly 3 neighbors becomes a live cell', () => {
    const expected = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];

    expect(
      createNextGeneration([
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]),
    ).toEqual(expected);
  });
});
