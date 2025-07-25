import {useQuery} from "@tanstack/react-query";

import {lawyerService} from "@/entities/Lawyer/Lawyer.module";

interface useRequestsByAdminProps {
  page: number;
  size: number;
}

export const useRequestsByAdmin = (argument: useRequestsByAdminProps) => {
  return useQuery({
    queryKey: [lawyerService.REQUESTS, argument.page],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return lawyerService.requests(argument.page, argument.size);
    },
  });
}