import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionsHistoryProps {
  page: number;
  size: number;
}

export const useQuestionsHistory = (argument: useQuestionsHistoryProps) => {
  return useQuery({
    queryKey: [forumService.QUESTIONS, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return forumService.questionsHistory(argument.page, argument.size);
    },
  });
}