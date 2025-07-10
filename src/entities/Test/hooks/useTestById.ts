import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestByIdProps {
  testId?: string;
  onError?: () => void;
}

export const useTestById = (argument: useTestByIdProps) => {
  return useQuery({
    queryKey: [testService.TESTS, argument?.testId],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
      argument.onError?.();
    },
    queryFn: () => {
      return testService.testsById(argument?.testId);
    },
    enabled: !!argument?.testId
  });
}