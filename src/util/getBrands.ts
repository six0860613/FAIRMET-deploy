import { Brand } from "../types";

const tagValidator = (array1: string[], array2: string[]) => {
  return (
    array1.some((el) => array2.includes(el)) ||
    array2.some((el) => array1.includes(el))
  );
};

type Args = {
  limit?: number;
  skip?: number;
  filter?: string[];
};

export const getBrands = async ({
  limit,
  skip,
  filter,
}: Args): Promise<Brand[]> => {
  const res = await fetch(`/data/brand.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const json = await res.json();
  const brands = [];
  let skipCount = 0;
  for (const brand of json.brands) {
    if (limit && brands.length >= limit) break;
    if (
      filter &&
      filter.length !== 0 &&
      Object.keys(brand.tags).some((key) => {
        return tagValidator(brand.tags[key as keyof typeof brand.tags], filter);
      })
    ) {
      continue;
    }
    if (skip && skipCount < skip) {
      skipCount++;
      continue;
    }
    brands.push(brand);
  }

  return brands;
};
