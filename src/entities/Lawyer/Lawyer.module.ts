import lawyerService from "./api/lawyer.service";
import {useLawyers} from "./hooks/useLawyers";
import {useDictionaries} from "./hooks/useDictionaries";
import {useLawyerCreate} from "./hooks/useLawyerCreate";
import {useRequestsByAdmin} from "./hooks/useRequestsByAdmin";
import {useRequestApproveByAdmin} from "./hooks/useRequestApproveByAdmin";

export {
  lawyerService,
  useLawyers,
  useDictionaries,
  useLawyerCreate,
  useRequestsByAdmin,
  useRequestApproveByAdmin,
}