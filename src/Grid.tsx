import { ReactElement } from "react";

/**
 * A grid showing a pattern
 * @constructor
 */
export default function Grid({ pattern }: { pattern: boolean[][] }) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${pattern[0].length}, 11px)` }}
    >
      {pattern.map((row, i) => {
        return row.map((isThread, j) => _createCell(i, j, isThread));
      })}
    </div>
  );

  function _createCell(
    row: number,
    column: number,
    isThread: boolean
  ): ReactElement {
    if (isThread) {
      return <div key={`${row}-${column}`} className="t" />;
    } else {
      return <div key={`${row}-${column}`} />;
    }
  }
}
