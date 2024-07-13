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
} from "@/components/ui/alert-dialog";
import { useDraw } from "@/hooks/useDraw";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [guess, setGuess] = useState<string>("");
  const [guessOpen, setGuessOpen] = useState<boolean>(false);
  const [guessCorrect, setGuessCorrect] = useState<boolean>(false);
  const [idea, setIdea] = useState<string>("");
  const [oldIdea, setOldIdea] = useState<string[]>([]);

  const sendImage = api.guess.send.useMutation({});
  const getIdea = api.guess.getIdea.useQuery({ oldIdea });

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

  const getNewIdea = async () => {
    clear();
    setOldIdea((prevState) => [...prevState, idea]);
    await getIdea.refetch();
  };

  useEffect(() => {
    setIdea(getIdea.data?.idea ?? "");
  }, [getIdea.data]);

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
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl">You need to draw a...</div>
        <div className="mb-4 flex h-20 items-center justify-center text-6xl">
          {idea ? (
            <p>{idea}</p>
          ) : (
            <Loader2 className="animate-spin" size={35} />
          )}
        </div>
      </div>
      <div className="mb-5 flex flex-row items-center justify-center gap-4">
        <Button className="bg-[#1e1f20] hover:bg-[#333537]" onClick={clear}>
          Clear
        </Button>
        <Button
          className="bg-[#1e1f20] hover:bg-[#333537]"
          onClick={getNewIdea}
        >
          New Idea
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
