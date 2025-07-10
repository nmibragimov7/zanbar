import type {TForum, TAnswer} from "./types/index";
import forumService from "./api/forum.service";
import {useCategories} from "./hooks/useCategories";
import {useQuestions} from "./hooks/useQuestions";
import {useQuestionById} from "./hooks/useQuestionById";
import {useQuestionsByCategory} from "./hooks/useQuestionsByCategory";
import {useSendAnswer} from "./hooks/useSendAnswer";
import {useSendLike} from "./hooks/useSendLike";
import {useQuestionCreate} from "./hooks/useQuestionCreate";
import {useQuestionsHistory} from "./hooks/useQuestionsHistory";
import {useAnswersHistory} from "./hooks/useAnswersHistory";
import {useQuestionsByAdmin} from "./hooks/useQuestionsByAdmin";
import {useQuestionApprove} from "@/entities/Forum/hooks/useQuestionApprove";
import {useQuestionRevoke} from "@/entities/Forum/hooks/useQuestionRevoke";

export {
  TForum,
  TAnswer,
  forumService,
  useCategories,
  useQuestions,
  useQuestionById,
  useQuestionsByCategory,
  useSendAnswer,
  useSendLike,
  useQuestionCreate,
  useQuestionsHistory,
  useAnswersHistory,
  useQuestionsByAdmin,
  useQuestionApprove,
  useQuestionRevoke,
}