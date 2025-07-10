import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useLessonStartProps {
  onSuccess: (key: string) => void;
}

export const useLessonStart = (argument: useLessonStartProps) => {
  return useMutation({
    mutationFn: courseService.lessonStart,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("lesson-start");
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