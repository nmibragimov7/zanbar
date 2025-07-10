import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {testService} from "@/entities/Test/Test.module";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";

interface useTestByIdByAdminProps {
  testId?: string;
  onError?: () => void;
}

export const useTestByIdByAdmin = (argument: useTestByIdByAdminProps) => {
  return useQuery({
    queryKey: [testService.TESTS_ADMIN, argument?.testId],
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
      argument.onError?.();
    },
    queryFn: () => {
      return testService.testsByIdByAdmin(argument?.testId);
    },
    enabled: !!argument?.testId
  });
}