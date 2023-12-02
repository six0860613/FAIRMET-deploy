import { Filter } from "../types";

export const getFilters = async (): Promise<Filter[]> => {
  const res = await fetch("/data/filter.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const json = await res.json();
  return json.filters;
};
