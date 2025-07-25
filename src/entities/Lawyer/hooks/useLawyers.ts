import {useQuery} from "@tanstack/react-query";

import {lawyerService} from "@/entities/Lawyer/Lawyer.module";

export const useLawyers = () => {
  return useQuery({
    queryKey: [lawyerService.LAWYERS],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return lawyerService.lawyers();
    },
  });
}