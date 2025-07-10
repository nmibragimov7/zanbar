import testService from "./api/test.service";
import {useTests} from "./hooks/useTests";
import {useTestById} from "./hooks/useTestById";
import {useTestStart} from "./hooks/useTestStart";
import {useTestFinish} from "./hooks/useTestFinish";
import {useTestsHistory} from "./hooks/useTestsHistory";
import {useTestsByAdmin} from "./hooks/useTestsByAdmin";
import {useTestCreate} from "./hooks/useTestCreate";
import {useTestEdit} from "./hooks/useTestEdit";
import {useTestByIdByAdmin} from "./hooks/useTestByIdByAdmin";
import {useTestRemove} from "./hooks/useTestRemove";
import type {TTest} from "./types";

export {
  testService,
  useTests,
  useTestById,
  useTestStart,
  useTestFinish,
  useTestsHistory,
  useTestsByAdmin,
  useTestCreate,
  useTestEdit,
  useTestByIdByAdmin,
  useTestRemove,
  TTest,
}