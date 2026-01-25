"use client";
import { useState, useRef, useEffect } from "react";

interface GridProps {
  rows: number;
  cols: number;
  fill?: boolean;
}

export default function Grid({ rows, cols, fill }: GridProps) {
  const [cells, setCells] = useState<boolean[]>(Array(rows * cols).fill(false));
  const isPointerDown = useRef(false);

  // Fill once if `fill` is true
  useEffect(() => {
    if (fill) setCells(Array(rows * cols).fill(true));
  }, [fill, rows, cols]);

  const toggleCell = (index: number) => {
    setCells(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handlePointerDown = (index: number) => {
    isPointerDown.current = true;
    toggleCell(index);
  };

  const handlePointerEnter = (index: number) => {
    if (isPointerDown.current) toggleCell(index);
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
  };

// Dynamically shrink cell gap for large grids
const gap = Math.max(1, Math.floor(16 / Math.max(rows, cols))); // gap in px

// Calculate the cell size dynamically
const cellSize = Math.min(95 / cols, 95 / rows); // Ensures the grid fits within 95% of the viewport

return (
  <div
    className="grid"
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: `${gap}px`,
      width: `${cellSize * cols}vmin`,
      height: `${cellSize * rows}vmin`,
    }}
    onPointerUp={handlePointerUp}
  >
    {cells.map((active, i) => {
      const r = Math.floor(i / cols); // Row index
      const c = i % cols; // Column index

      return (
        <div
          key={i}
          className={`border select-none cursor-pointer ${
            active ? "bg-blue-500" : "bg-gray-200"
          }`}
          style={{
            width: `${cellSize}vmin`,
            height: `${cellSize}vmin`,
	    display: `flex`,
	    justifyContent: `center`,
	    alignItems: `center`,
          }}
          onPointerDown={() => handlePointerDown(i)}
          onPointerEnter={() => handlePointerEnter(i)}
        >
	  <span
	    style={{
              fontSize: `${cellSize / 3.3}vmin`,
	      opacity: 0.6,
	    }}
	    >
            ({r},{c}) {/* Display the row and column */}
	  </span>
        </div>
      );
    })}
  </div>
);
}

