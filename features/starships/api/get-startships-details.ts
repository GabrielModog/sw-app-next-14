
import { ApiCall } from "@/types/api-call";
import { IStarship }  from "../types";
import { api } from "@/lib/api";

export const getStarshipsDetailsRequest: ApiCall<IStarship, { id: string }> = async ({ id }) => {
  try {
    const { data } = await api.get(`/starships/${id}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
