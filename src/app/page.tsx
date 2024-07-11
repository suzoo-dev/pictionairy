/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Button } from "@/components/ui/button";
import { useDraw } from "@/hooks/useDraw";
import { api } from "@/trpc/react";

export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const sendImage = api.guess.send.useMutation({});

  const handleGuess = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL("image/png");

    sendImage.mutate({ image: imageData });
  };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "#FFF";
    const lineWidth = 5;

    const startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#151920] via-[#9c72ca] to-[#151920] text-white">
      <div className="mb-10 inline-block bg-gradient-to-r from-[#4e83ef] via-[#a96fb5] to-[#d96570] bg-clip-text p-4 text-6xl font-medium text-transparent">
        PictionAIry
      </div>
      <div className="mb-5 flex flex-row items-center justify-center gap-4">
        <Button className="bg-[#1e1f20] hover:bg-[#333537]" onClick={clear}>
          Clear
        </Button>
        <Button
          className="bg-[#1e1f20] hover:bg-[#333537]"
          onClick={handleGuess}
        >
          Guess
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        className="rounded-md border border-black bg-black"
      />
    </div>
  );
}
