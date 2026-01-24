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
  
  return (
    <div
      className="grid gap-1"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        width: "95vmin",
        height: "95vmin", // always a square container
      }}
      onPointerUp={handlePointerUp}
    >
      {cells.map((active, i) => (
        <div
          key={i}
          className={`w-5.5 h-5.5 border select-none cursor-pointer ${
            active ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPointerDown={() => handlePointerDown(i)}
          onPointerEnter={() => handlePointerEnter(i)}
        />
      ))}
    </div>
  );
}

{/*
  return (
    <div
      className="overflow-hidden" // disable scrolling
      onPointerUp={handlePointerUp}
    >
      {cells.map((active, i) => (
        <div
          key={i}
          className={`border select-none cursor-pointer bg-gray-200 ${
            active ? "bg-blue-500" : "bg-gray-200"
          }`}
          style={{ aspectRatio: "1 / 1" }}
          onPointerDown={() => handlePointerDown(i)}
          onPointerEnter={() => handlePointerEnter(i)}
        />
      ))}
    </div>
  );
}
*/}

