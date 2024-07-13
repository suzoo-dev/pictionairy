"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDraw } from "@/hooks/useDraw";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [guess, setGuess] = useState("");
  const [guessOpen, setGuessOpen] = useState(false);
  const [guessCorrect, setGuessCorrect] = useState(false);

  const sendImage = api.guess.send.useMutation({});

  const handleCorrect = () => {
    setGuessCorrect(true);
    setGuessOpen(false);
  };

  const handleCancel = () => {
    setGuessOpen(false);
  };

  const onScreenClick = () => setGuessCorrect(false);

  const handleGuess = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL("image/png");

    sendImage.mutate({ image: imageData });
  };

  useEffect(() => {
    if (sendImage.data) {
      setGuess(sendImage.data.answer);
      setGuessOpen(true);
      window.addEventListener("mousedown", onScreenClick);
    }

    return () => window.removeEventListener("mousedown", onScreenClick);
  }, [sendImage.data]);

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
      {guess && (
        <AlertDialog open={guessOpen}>
          <AlertDialogContent>
            <AlertDialogHeader className="mb-8">
              <AlertDialogTitle className="mb-6 text-center text-xl">
                🥁 🥁 🥁 🥁 🥁 🥁 🥁 🥁
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-4xl font-bold">
                {guess}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row items-center justify-center gap-10 sm:items-center sm:justify-center">
              <AlertDialogCancel
                className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
                onClick={handleCancel}
              >
                Wrong
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-500 hover:bg-green-400"
                onClick={handleCorrect}
              >
                Correct
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {guessCorrect && <Fireworks autorun={{ speed: 3 }} />}
    </div>
  );
}
