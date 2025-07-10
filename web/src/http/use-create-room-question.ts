import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateRoomQuestionResponse } from "./types/create-room-question-response";

export function useCreateRoomQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result: CreateRoomQuestionResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-rooms-questions", roomId],
      });
    },
  });
}
