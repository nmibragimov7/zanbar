import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseByIdByAdminProps {
  courseId?: string;
  onError: () => void;
}

export const useCourseByIdByAdmin = (argument: useCourseByIdByAdminProps) => {
  return useQuery({
    queryKey: [courseService.COURSES_ADMIN, argument?.courseId],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
      argument.onError?.();
    },
    queryFn: () => {
      return courseService.courseByIdByAdmin(argument?.courseId);
    },
    enabled: !!argument?.courseId
  });
}