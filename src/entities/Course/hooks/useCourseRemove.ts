import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseRemoveProps {
  onSuccess: (key: string) => void;
}

export const useCourseRemove = (argument: useCourseRemoveProps) => {
  return useMutation({
    mutationFn: courseService.remove,
    onSuccess() {
      argument.onSuccess("course-remove");
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}