import {useQuery} from "@tanstack/react-query";

import {courseService} from "@/entities/Course/Course.module";
import {accessTokenStorage, refreshTokenStorage, userStorage} from "@/shared/lib/lsStorage";

interface useCoursesProps {
  isAuth: boolean;
  page: number;
  size: number;
  onError?: () => void
}

export const useCourses = (argument: useCoursesProps) => {
  return useQuery({
    queryKey: [courseService.COURSES, argument.page],
    onError(error: any) {
      console.dir(error);
      argument?.onError?.();
    },
    queryFn: () => {
      console.log(argument)
      return argument.isAuth ? courseService.coursesWithAuth(argument.page, argument.size) : courseService.courses(argument.page, argument.size);
    },
  });
}