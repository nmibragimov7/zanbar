import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {courseService} from "@/entities/Course/Course.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useLessonFinishProps {
  onSuccess: (key: string) => void;
}

export const useLessonFinish = (argument: useLessonFinishProps) => {
  return useMutation({
    mutationFn: courseService.lessonFinish,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("finish");
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