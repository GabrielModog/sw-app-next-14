
import { ApiCall } from "@/types/api-call";
import { IPeople }  from "../types";
import { api } from "@/lib/api";

export const getPeopleDetailsRequest: ApiCall<IPeople, { id: string }> = async ({ id }) => {
  try {
    const { data } = await api.get(`/people/${id}`);
    return [null, data];
  } catch (error) {
    console.error("Something went wrong:", error);
    return [{ message: "Something went wrong" }, null];
  }
};
