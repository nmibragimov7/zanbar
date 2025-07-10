import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionByIdProps {
  questionId?: string;
  onError?: () => void;
}

export const useQuestionById = (argument: useQuestionByIdProps) => {
  return useQuery({
    queryKey: [forumService.QUESTIONS, argument?.questionId],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
      argument.onError?.();
    },
    queryFn: () => {
      return forumService.questionById(argument?.questionId);
    },
    enabled: !!argument?.questionId
  });
}