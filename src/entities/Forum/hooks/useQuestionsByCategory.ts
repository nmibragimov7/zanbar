import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionsProps {
  page: number;
  size: number;
  categoryId: number;
}

export const useQuestionsByCategory = (argument: useQuestionsProps) => {
  return useQuery({
    queryKey: [forumService.QUESTIONS, argument.categoryId, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return forumService.questionsByCategory(argument.page, argument.size, argument.categoryId);
    },
    enabled: !!argument?.categoryId,
  });
}