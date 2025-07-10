import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateRoomQuestionResponse } from "./types/create-room-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

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
    onMutate: ({ question }) => {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-rooms-questions",
        roomId,
      ]);
      const questionsArray = questions ?? [];
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratedAnswer: true,
      };
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-rooms-questions", roomId],
        [newQuestion, ...questionsArray]
      );
      return { newQuestion, questions };
    },
    onSuccess: (data, _v, ctx) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-rooms-questions", roomId],
        (questions) => {
          if (!(questions && ctx.newQuestion)) {
            return questions;
          }
          return questions.map((question) => {
            if (question.id === ctx.newQuestion.id) {
              return {
                ...ctx.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratedAnswer: false,
              };
            }
            return question;
          });
        }
      );
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-rooms-questions", roomId],
          ctx.questions
        );
      }
    },
  });
}
