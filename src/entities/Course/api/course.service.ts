import {fetcher} from "@/shared/lib/axios";

const api = {
  courses: "/v1/main-info/popular/courses",
  coursesWithAuth: "/v1/courses",
  courseById: "/v1/courses",
  start: (id: number) => `/v1/courses/${id}/start`,
  lessonFinish: (id: number) => `/v1/lessons/${id}/finish`,
  lessonStart: (id: number) => `/v1/lessons/${id}/start`,
  history: "/v1/courses/history",
  search: "/v1/search",
  coursesByAdmin: "/v1/admin/courses",
  courseByIdByAdmin: "/v1/admin/courses",
  create: "/v1/admin/courses",
}

class CourseService {
  COURSES = "courses";
  COURSES_ADMIN = "admin_courses";
  SEARCH = "search";

  courses(page: number, size: number) {
    return fetcher.get(api.courses, {
      params: {
        page,
        size,
      }
    })
  }
  coursesWithAuth(page: number, size: number) {
    return fetcher.get(api.coursesWithAuth, {
      params: {
        page,
        size,
      }
    })
  }
  courseById(id: string | undefined) {
    return fetcher.get(api.courseById + "/" + id)
  }
  start(id: number) {
    return fetcher.post(api.start(id), null)
  }
  lessonFinish(id: number) {
    return fetcher.post(api.lessonFinish(id), null)
  }
  lessonStart(id: number) {
    return fetcher.post(api.lessonStart(id), null)
  }
  history(page: number, size: number) {
    return fetcher.get(api.history, {
      params: {
        page,
        size,
      }
    })
  }
  search(query: string) {
    return fetcher.get(api.search, {
      params: {
        query,
      }
    })
  }
  coursesByAdmin(page: number, size: number) {
    return fetcher.get(api.coursesByAdmin, {
      params: {
        page,
        size,
      }
    })
  }
  courseByIdByAdmin(id: string | undefined) {
    return fetcher.get(api.courseByIdByAdmin + "/" + id)
  }
  create(body: any) {
    return fetcher.post(api.create, body)
  }
  edit(body: any) {
    return fetcher.put(api.create, body)
  }
  remove(id: string | undefined) {
    return fetcher.delete(api.create + "/" + id)
  }
}

export default new CourseService();
