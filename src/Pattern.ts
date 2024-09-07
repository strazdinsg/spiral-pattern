/**
 * Calculates a spiral pattern.
 * @param maxDistance - The maximum distance from the center of the pattern.
 */
export function calculatePattern(maxDistance: number) {
  const rows = maxDistance * 2 + 1;
  const columns = maxDistance * 2 + 1;
  const centerX = (columns - 1) / 2;
  const centerY = (rows - 1) / 2;

  const threadDistances = _createThreadDistanceArray();
  _markThreadDistances();

  const pattern: boolean[][] = _createPatternArray(rows, columns);
  _markThreadsInPattern();

  return pattern;

  function _createPatternArray(rows: number, columns: number): boolean[][] {
    return Array.from(
      {
        length: rows,
      },
      () =>
        Array.from({
          length: columns,
        })
    );
  }

  function _createThreadDistanceArray(): boolean[] {
    return Array.from({
      length: maxDistance * 2,
    });
  }

  function _markThreadsInPattern() {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        pattern[row][column] = _isThread(row, column);
      }
    }
  }

  function _isThread(row: number, column: number): boolean {
    const d = _distanceFromCenter(column, row);
    return threadDistances[d];
  }

  function _distanceFromCenter(column: number, row: number) {
    const dx = Math.abs(column - centerX);
    const dy = Math.abs(row - centerY);
    return dx + dy;
  }

  function _markThreadDistances() {
    for (let i = 0; i < threadDistances.length; i++) {
      threadDistances[i] = false;
    }

    let i = 1;
    let d = 0;
    threadDistances[0] = true;

    while (d < threadDistances.length) {
      const newD = i * i + 5 * i;
      _fillEveryOtherBetween(d + 3, newD - 3);
      d = newD;
      threadDistances[d] = true;
      threadDistances[d - 1] = true;
      i++;
    }
  }

  function _fillEveryOtherBetween(start: number, end: number) {
    for (let i = start; i <= end; i += 2) {
      if (i < threadDistances.length) {
        threadDistances[i] = true;
      }
    }
  }
}
