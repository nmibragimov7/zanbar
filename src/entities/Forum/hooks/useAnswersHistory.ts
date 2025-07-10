import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useAnswersHistoryProps {
  page: number;
  size: number;
}

export const useAnswersHistory = (argument: useAnswersHistoryProps) => {
  return useQuery({
    queryKey: [forumService.ANSWERS, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return forumService.answersHistory(argument.page, argument.size);
    },
  });
}