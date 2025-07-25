import {useQuery} from "@tanstack/react-query";

import {lawyerService} from "@/entities/Lawyer/Lawyer.module";

export const useDictionaries = () => {
  return useQuery({
    queryKey: [lawyerService.DICTIONARIES],
    onError(error: any) {
      console.dir(error);
    },
    queryFn: () => {
      return lawyerService.dictionaries();
    },
  });
}