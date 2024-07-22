import { api } from "@/lib/api";
import { ApiCall } from "@/types/api-call";
import { ResponseData } from "@/types/response";
import { StarshipsListType } from "../types";

export const getStarshipsRequest: ApiCall<
  ResponseData<StarshipsListType>,
  { page: number }
> = async ({ page = 1 }) => {
  try {
    const { data } = await api.get(`/starships/?page=${page}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
