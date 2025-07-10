import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestsProps {
  isAuth: boolean;
  page: number;
  size: number;
}

export const useTests = (argument: useTestsProps) => {
  return useQuery({
    queryKey: [testService.TESTS, argument.page],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
    queryFn: () => {
      return argument.isAuth ? testService.testsWithAuth(argument.page, argument.size) : testService.tests(argument.page, argument.size);
    },
  });
}