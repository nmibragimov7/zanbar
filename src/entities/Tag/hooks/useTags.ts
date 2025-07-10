import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {tagService} from "@/entities/Tag/Tag.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

export const useTags = () => {
  return useQuery({
    queryKey: [tagService.TAGS],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return tagService.tags();
    },
  });
}