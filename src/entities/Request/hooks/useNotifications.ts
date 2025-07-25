import {useQuery} from "@tanstack/react-query";

import {requestService} from "@/entities/Request/Request.module";

export const useRequests = () => {
  return useQuery({
    queryKey: [requestService.REQUESTS],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return requestService.requests();
    },
  });
}