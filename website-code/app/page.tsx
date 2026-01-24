"use client";

import Grid from "@/components/Grid";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [key, setKey] = useState(0); // remount grid for clear/fill
  const [flag, setFlag] = useState(false); // remount grid for clear/fill

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-8">
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
        <Grid rows={32} cols={32} key={key} fill={flag} />
      </div>
    </main>
  );
}
