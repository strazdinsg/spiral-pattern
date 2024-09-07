/**
 * A grid showing cells in a spiral pattern.
 * @param maxDistance The maximum distance from the center (horizontally and vertically).
 * The number of rows and columns will be 2 * maxDistance + 1.
 * @constructor
 */
export default function Grid({ maxDistance }: { maxDistance: number }) {
  const rows = maxDistance * 2 + 1;
  const columns = maxDistance * 2 + 1;
  const centerX = (columns - 1) / 2;
  const centerY = (rows - 1) / 2;
  const threadDistances: boolean[] = Array.from({ length: maxDistance * 2 });
  _markThreadDistances();

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 11px)` }}
    >
      {Array.from({ length: rows }).map((_, i) =>
        Array.from({ length: columns }).map((_, j) => _cell(i, j))
      )}
    </div>
  );

  function _cell(row: number, column: number) {
    const key = `${row}-${column}`;
    return (
      <div
        className={_isThread(row, column) ? "thread" : "empty"}
        key={key}
      ></div>
    );
  }

  function _isThread(row: number, column: number) {
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
