import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestsByAdminProps {
  page: number;
  size: number;
}

export const useTestsByAdmin = (argument: useTestsByAdminProps) => {
  return useQuery({
    queryKey: [testService.TESTS_ADMIN, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return testService.testsByAdmin(argument.page, argument.size);
    },
  });
}