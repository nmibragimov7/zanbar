import {fetcher} from "@/shared/lib/axios";

const api = {
  tags: "/v1/courses/tags",
}

class TagService {
  TAGS = "tags";

  tags() {
    return fetcher.get(api.tags)
  }
}

export default new TagService();
