import { Filter } from "../types";

export const getSpecificItems = async (): Promise<Filter[]> => {
  const res = await fetch("/data/specific.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const json = await res.json();
  return json.filters;
};
