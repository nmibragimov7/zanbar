import {useQuery} from "@tanstack/react-query";

import {forumService} from "@/entities/Forum/Forum.module";

interface useQuestionsProps {
  page: number;
  size: number;
}

export const useQuestions = (argument: useQuestionsProps) => {
  return useQuery({
    queryKey: [forumService.QUESTIONS, argument.page],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return forumService.questions(argument.page, argument.size);
    },
  });
}