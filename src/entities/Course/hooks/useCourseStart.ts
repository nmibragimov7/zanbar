import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useCourseStartProps {
  onSuccess: (key: string) => void;
}

export const useCourseStart = (argument: useCourseStartProps) => {
  return useMutation({
    mutationFn: courseService.start,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("start");
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