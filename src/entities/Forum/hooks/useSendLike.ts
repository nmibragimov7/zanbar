import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {forumService} from "@/entities/Forum/Forum.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useSendLikeProps {
  onSuccess: (key: string) => void;
}

export const useSendLike = (argument: useSendLikeProps) => {
  return useMutation({
    mutationFn: forumService.sendLike,
    onSuccess(response: any) {
      if (response.data) {
        argument.onSuccess("send-like");
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