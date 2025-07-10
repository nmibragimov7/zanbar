import {fetcher} from "@/shared/lib/axios";

const api = {
  tests: "/v1/main-info/popular/tests",
  testsWithAuth: "/v1/tests",
  start: (id: number) => `/v1/tests/${id}/start`,
  finish: (id: number) => `/v1/tests/${id}/finish`,
  history: "/v1/tests/history",
  testsByAdmin: "/v1/admin/tests",
  create: "/v1/admin/tests",
}

class TestService {
  TESTS = "tests";
  TESTS_ADMIN = "admin_tests";

  tests(page: number, size: number) {
    return fetcher.get(api.tests, {
      params: {
        page,
        size,
      }
    })
  }
  testsWithAuth(page: number, size: number) {
    return fetcher.get(api.testsWithAuth, {
      params: {
        page,
        size,
      }
    })
  }
  testsById(id: string | undefined) {
    return fetcher.get(api.tests + "/" + id)
  }
  start(id: number) {
    return fetcher.post(api.start(id), null)
  }
  finish({id, body}: {id: number, body: any[]}) {
    return fetcher.post(api.finish(id), body)
  }
  history(page: number, size: number) {
    return fetcher.get(api.history, {
      params: {
        page,
        size,
      }
    })
  }
  testsByAdmin(page: number, size: number) {
    return fetcher.get(api.testsByAdmin, {
      params: {
        page,
        size,
      }
    })
  }
  testsByIdByAdmin(id: string | undefined) {
    return fetcher.get(api.testsByAdmin + "/" + id)
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

export default new TestService();
