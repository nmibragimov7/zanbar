import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseEditProps {
  onSuccess: (key: string) => void;
}

export const useCourseEdit = (argument: useCourseEditProps) => {
  return useMutation({
    mutationFn: courseService.edit,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("course-edit");
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