import {useQuery} from "@tanstack/react-query";

import {requestService} from "@/entities/Request/Request.module";

interface useNotificationsProps {
  isAuth: boolean;
  page: number;
  size: number;
}

export const useNotifications = (argument: useNotificationsProps) => {
  return useQuery({
    queryKey: [requestService.NOTIFICATIONS, argument.page],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return requestService.notifications(argument.page, argument.size);
    },
    enabled: argument.isAuth,
  });
}