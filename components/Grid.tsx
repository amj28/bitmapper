"use client";
import { useState, useRef, useEffect } from "react";

interface GridProps {
  rows: number;
  cols: number;
  fill?: boolean;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  dirty: boolean;
  setDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Grid({ rows, cols, fill, code, setCode, dirty, setDirty }: GridProps) {
  const [cells, setCells] = useState<boolean[]>(Array(rows * cols).fill(false));

  const isPointerDown = useRef(false);

  // Fill once if `fill` is true
  useEffect(() => {
    if (fill) setCells(Array(rows * cols).fill(true));
  }, [fill, rows, cols]);


  useEffect(() => {
    if (!dirty) return;
  
    const timer = setTimeout(() => {
      const ints: bigint[] = Array(rows).fill(0n); // BigInt array
  
      cells.forEach((v, i) => {
        if (v) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          ints[row] = ints[row] | (1n << BigInt(cols - 1 - col)); // both operands BigInt
        }
      });
  
      let newCode = `std::array<std::int${cols}_t, ${rows}> test = \n{ `;
      ints.forEach((n, i) => {
        newCode += n.toString();
        if (i < ints.length - 1) newCode += (i + 1) % 8 === 0 ? ",\n" : ", ";
      });
      newCode += " };";
  
      setCode(newCode);
      setDirty(false);
    }, 5000);
  
    return () => clearTimeout(timer);
  }, [dirty, cells, setCode, rows, cols]);


  const toggleCell = (index: number) => {
    setCells(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];

      if (!dirty) setTimeout(() => setDirty(true), 0);

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
  const cellSize = Math.min(92.5 / cols, 92.5 / rows); // Ensures the grid fits within 95% of the viewport
  
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

