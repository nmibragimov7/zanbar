import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestsHistoryProps {
  page: number;
  size: number;
}

export const useTestsHistory = (argument: useTestsHistoryProps) => {
  return useQuery({
    queryKey: [testService.TESTS, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return testService.history(argument.page, argument.size);
    },
  });
}