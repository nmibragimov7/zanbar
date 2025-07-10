import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseByIdProps {
  courseId?: string;
  onError: () => void;
}

export const useCourseById = (argument: useCourseByIdProps) => {
  return useQuery({
    queryKey: [courseService.COURSES, argument?.courseId],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
      argument.onError?.();
    },
    queryFn: () => {
      return courseService.courseById(argument?.courseId);
    },
    enabled: !!argument?.courseId
  });
}