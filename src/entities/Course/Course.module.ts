import courseService from "./api/course.service";
import {useCourses} from "./hooks/useCourses";
import {useCourseById} from "./hooks/useCourseById";
import {useCourseStart} from "./hooks/useCourseStart";
import {useLessonFinish} from "./hooks/useLessonFinish";
import {useLessonStart} from "./hooks/useLessonStart";
import {useCoursesHistory} from "./hooks/useCoursesHistory";
import {useSearch} from "./hooks/useSearch";
import {useCoursesByAdmin} from "./hooks/useCoursesByAdmin";
import {useCourseByIdByAdmin} from "./hooks/useCourseByIdByAdmin";
import {useCourseCreate} from "./hooks/useCourseCreate";
import {useCourseEdit} from "./hooks/useCourseEdit";
import {useCourseRemove} from "./hooks/useCourseRemove";
import type {TCourse} from "./types";

export {
  courseService,
  useCourses,
  useCourseById,
  useCourseStart,
  useLessonFinish,
  useLessonStart,
  useCoursesHistory,
  useSearch,
  useCoursesByAdmin,
  useCourseByIdByAdmin,
  useCourseCreate,
  useCourseEdit,
  useCourseRemove,
  TCourse,
}