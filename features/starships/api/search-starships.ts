import { api } from "@/lib/api";
import { ApiCall } from "@/types/api-call";
import { ResponseData } from "@/types/response";
import { StarshipsListType } from "../types";

export const searchStarshipsRequest: ApiCall<ResponseData<StarshipsListType>, { starship: string }> = async ({ starship }) => {
  try {
    const { data } = await api.get(`/starships/?search=${starship}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
