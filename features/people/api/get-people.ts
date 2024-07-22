import { api } from "@/lib/api";
import { ApiCall } from "@/types/api-call";
import { ResponseData } from "@/types/response";
import { PeopleListType } from "../types";

export const getPeopleRequest: ApiCall<ResponseData<PeopleListType>, { page: number }> = async ({ page = 1 }) => {
  try {
    const { data } = await api.get(`/people/?page=${page}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
