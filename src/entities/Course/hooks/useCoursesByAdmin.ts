import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCoursesByAdminProps {
  page: number;
  size: number;
}

export const useCoursesByAdmin = (argument: useCoursesByAdminProps) => {
  return useQuery({
    queryKey: [courseService.COURSES_ADMIN, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return courseService.coursesByAdmin(argument.page, argument.size);
    },
  });
}