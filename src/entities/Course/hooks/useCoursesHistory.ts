import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCoursesHistoryProps {
  page: number;
  size: number;
}

export const useCoursesHistory = (argument: useCoursesHistoryProps) => {
  return useQuery({
    queryKey: [courseService.COURSES, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return courseService.history(argument.page, argument.size);
    },
  });
}