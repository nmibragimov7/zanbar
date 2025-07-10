import {useQuery} from "@tanstack/react-query";

import {courseService} from "@/entities/Course/Course.module";

interface useSearchProps {
  search: string;
}

export const useSearch = (argument: useSearchProps) => {
  return useQuery({
    queryKey: [courseService.SEARCH, argument.search],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return courseService.search(argument.search)
    },
    enabled: !!argument.search
  });
}