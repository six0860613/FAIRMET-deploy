import { faker } from "@faker-js/faker";
import { TBook } from "../types";

type Args = {
  limit?: number;
  category?: string;
  skip?: number;
  tag?: string;
};

export const getBooks = async ({
  limit,
  category,
  skip,
  tag,
}: Args): Promise<TBook[]> => {
  const res = await fetch("/data/book.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const json = await res.json();
  const books = [];
  let skipCount = 0;
  for (const book of json.books) {
    if (limit && books.length >= limit) break;
    if (category && category !== "ALL" && category !== book.category) continue;
    if (tag && !book.tags["Item & Category"].includes(tag)) continue;
    if (skip && skipCount < skip) {
      skipCount++;
      continue;
    }
    book.image = faker.image.url({
      width: 400,
      height: 700,
    });
    books.push(book);
  }

  return books;
};
