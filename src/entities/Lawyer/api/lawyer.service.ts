import {fetcher} from "@/shared/lib/axios";

const api = {
  lawyers: "/v1/lawyers",
  dictionaries: "/v1/lawyers/dict",
  create: "/v1/lawyers/create",
  requests: "/v1/lawyers/by-application-type",
  approve: "/v1/lawyers/approve-lawyer/",
}

class LawyerService {
  LAWYERS = "lawyers";
  DICTIONARIES = "dictionaries";
  REQUESTS = "requests";

  lawyers() {
    return fetcher.get(api.lawyers)
  }
  dictionaries() {
    return fetcher.get(api.dictionaries)
  }
  create(body: any) {
    return fetcher.post(api.create, body);
  }
  requests(page: number, size: number) {
    return fetcher.get(api.requests, {
      params: {
        page,
        size,
      }
    })
  }
  approve({id, approved}: {id: number, approved: boolean}) {
    return fetcher.post(api.approve + id, null, {
      params: {
        approved,
      }
    })
  }
}

export default new LawyerService();
