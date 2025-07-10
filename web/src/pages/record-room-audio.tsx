/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  if (!roomId) {
    return <Navigate replace to="/" />;
  }
  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("recorder started");
    };

    recorder.current.onstop = () => {
      console.log("recorder stopped");
    };

    recorder.current.start();
  }
  async function startRecording() {
    if (!isRecordingSupported) {
      alert("o seu navegador não suporta navegação");
      return;
    }
    setIsRecording(true);
    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      createRecorder(audio);

      intervalRef.current = setInterval(() => {
        recorder.current?.stop();
        createRecorder(audio);
      }, 5000);
    } catch (error) {
      console.error("Erro ao gravar áudio", error);
    }
  }
  function stopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }
  async function uploadAudio(audioBlob: Blob) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    const response = await fetch(
      `http://localhost:3333/rooms/${roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
