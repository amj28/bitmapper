"use client";

import Grid from "@/components/Grid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  const [key, setKey] = useState(0); // remount grid for clear/fill
  const [flag, setFlag] = useState(false); // remount grid for clear/fill
  const [size, setSize] = useState(32); // sets grid size, default 32x32

  const handleSizeChange = (value: string) => {
    setSize(Number(value)); // Set size directly from value
    setKey(k => k+1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center gap-8">

        <Select onValueChange={handleSizeChange} >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Set Bitmap size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>WidthxHeight</SelectLabel>
              <SelectItem value="16">16x16</SelectItem>
              <SelectItem value="32">32x32</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Fill button - fills the grid once */}
        <Button
          variant="outline"
          aria-label="Fill grid"
          onClick={() => {
		  if (!flag) {
			  setFlag(true);
			  setKey(k => k + 1);
		  }
	  }}
        >
          Fill
        </Button>

        {/* Clear button - resets grid */}
        <Button
          variant="outline"
          aria-label="Clear grid"
          onClick={() => {
		  setFlag(false);	
		  setKey(k => k + 1);
	  }}
        >
          Clear
        </Button>

        {/* Grid itself */}
        <Grid rows={size} cols={size} key={key} fill={flag} />
    </main>
  );
}
