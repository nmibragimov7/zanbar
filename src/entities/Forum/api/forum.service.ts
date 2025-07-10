import {fetcher} from "@/shared/lib/axios";
import {TForum} from "@/entities/Forum/types";

const api = {
  category: "/v1/forums/category",
  questions: "/v1/forums",
  answer: "/v1/forums/answer",
  like: "/v1/forums/like",
  create: "/v1/forums",
  questionsHistory: "/v1/forums/history",
  answersHistory: "/v1/forums/answer/history",
  questionsByAdmin: "/v1/admin/forums",
  approve: "/v1/admin/forums/approve",
  revoke: "/v1/admin/forums/revoke",
}

class ForumService {
  CATEGORIES = "categories";
  QUESTIONS = "questions";
  QUESTIONS_ADMIN = "admin_questions"
  ANSWERS = "answers";

  categories() {
    return fetcher.get(api.category)
  }
  questions(page: number, size: number) {
    return fetcher.get(api.questions, {
      params: {
        page,
        size,
      }
    })
  }
  questionsByCategory(page: number, size: number, forumCategoryId: number) {
    return fetcher.get(api.questions + "/by-forum-category", {
      params: {
        page,
        size,
        forumCategoryId,
      }
    })
  }
  questionById(id: string | undefined) {
    return fetcher.get(api.questions + "/" + id)
  }
  sendAnswer({id, body}: {id: number, body: {text: string}}) {
    return fetcher.post(api.answer + "/" + id, body)
  }
  sendLike(id: number | undefined) {
    return fetcher.post(api.like + "/" + id)
  }
  create(body: TForum) {
    return fetcher.post(api.create, body)
  }
  questionsHistory(page: number, size: number) {
    return fetcher.get(api.questionsHistory, {
      params: {
        page,
        size,
      }
    })
  }
  answersHistory(page: number, size: number) {
    return fetcher.get(api.answersHistory, {
      params: {
        page,
        size,
      }
    })
  }
  questionsByAdmin(page: number, size: number) {
    return fetcher.get(api.questionsByAdmin, {
      params: {
        page,
        size,
      }
    })
  }
  approve(id: string | undefined) {
    return fetcher.post(api.approve, id, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  revoke(id: string | undefined) {
    return fetcher.post(api.revoke, id, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
}

export default new ForumService();
