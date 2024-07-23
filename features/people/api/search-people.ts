import { api } from "@/lib/api";
import { ApiCall } from "@/types/api-call";
import { ResponseData } from "@/types/response";
import { PeopleListType } from "../types";

export const searchPeopleRequest: ApiCall<ResponseData<PeopleListType>, { person: string }> = async ({ person }) => {
  try {
    const { data } = await api.get(`/people/?search=${person}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
