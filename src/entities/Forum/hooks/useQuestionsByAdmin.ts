import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useQuestionsByAdminProps {
  page: number;
  size: number;
}

export const useQuestionsByAdmin = (argument: useQuestionsByAdminProps) => {
  return useQuery({
    queryKey: [forumService.QUESTIONS_ADMIN, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return forumService.questionsByAdmin(argument.page, argument.size);
    },
  });
}