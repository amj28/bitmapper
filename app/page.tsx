"use client";

import Grid from "@/components/Grid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "@/components/ui/code-block"
import { Check, Copy } from "lucide-react"
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
  const [copied, setCopied] = useState(false); // state for copy button feedback
  const [dirty, setDirty] = useState(false); // tells us when to update code string
  
  const str = `std::array<std::uint32_t, 4> test = 
	  { 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0  }`;

  const [code, setCode] = useState(str);

  const handleSizeChange = (value: string) => {
    setSize(Number(value)); // Set size directly from value
    setKey(k => k+1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code); // Copy code to clipboard
    setCopied(true); // Show feedback
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <main className="min-h-screen flex items-center justify-center gap-8">

      <div className="flex flex-col gap-4">
        {/* Div 1: Select and Buttons */}
        <div className="flex items-center gap-8">
          <Select onValueChange={handleSizeChange}>
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

          <Button
            variant="outline"
            aria-label="Fill grid"
            onClick={() => {
              if (!flag) {
                setFlag(true);
		if (!dirty) setDirty(true);
                setKey(k => k + 1);
              }
            }}
          >
            Fill
          </Button>

          <Button
            variant="outline"
            aria-label="Clear grid"
            onClick={() => {
              setFlag(false);
	      if (!dirty) setDirty(true);
              setKey(k => k + 1);
            }}
          >
            Clear
          </Button>
        </div>

	<div className="flex justify-center items-center">
          <CodeBlock>
            <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                  C++
                </div>
                <span className="text-muted-foreground text-sm">code.cpp</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CodeBlockGroup>
            <CodeBlockCode code={code} language="cpp" />
          </CodeBlock>
        </div>
      </div>

        {/* Grid itself */}
        <Grid 
	  rows={size} 
	  cols={size}
	  key={key} 
	  fill={flag} 
	  code={code} setCode={setCode} 
	  dirty={dirty} setDirty={setDirty} 
	/>

    </main>
  );
}
