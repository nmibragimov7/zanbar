import {fetcher} from "@/shared/lib/axios";

const api = {
  requests: "/v1/lawyers/application",
  notifications: "/v1/notifications",
}

class RequestService {
  REQUESTS = "requests";
  NOTIFICATIONS = "notifications";

  requests() {
    return fetcher.get(api.requests)
  }
  create(body: any) {
    return fetcher.post(api.requests, body);
  }
  notifications(page: number, size: number) {
    return fetcher.get(api.notifications, {
      params: {
        page,
        size,
      }
    })
  }
}

export default new RequestService();
