import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseCreateProps {
  onSuccess: (key: string) => void;
}

export const useCourseCreate = (argument: useCourseCreateProps) => {
  return useMutation({
    mutationFn: courseService.create,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("course-create");
      }
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}