import {useQuery} from "@tanstack/react-query";

import {courseService} from "@/entities/Course/Course.module";

interface useCoursesProps {
  isAuth: boolean;
  page: number;
  size: number;
}

export const useCourses = (argument: useCoursesProps) => {
  return useQuery({
    queryKey: [courseService.COURSES, argument.page],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return argument.isAuth ? courseService.coursesWithAuth(argument.page, argument.size) : courseService.courses(argument.page, argument.size);
    },
  });
}