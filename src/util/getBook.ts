import { faker } from "@faker-js/faker";
import { TBook } from "../types";

type Args = {
  id: string;
};

export const getBook = async ({
  id,
}: Args): Promise<{ book: TBook; next: TBook; previous: TBook }> => {
  const res = await fetch("/data/book.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const json = await res.json();
  const bookIndex = json.books.findIndex((el: TBook) => id === el.id);
  json.books[bookIndex].image = faker.image.url();
  const nextIndex = bookIndex === json.books.length - 1 ? 0 : bookIndex + 1;
  const previousIndex = bookIndex === 0 ? json.books.length - 1 : bookIndex - 1;

  return {
    book: json.books[bookIndex],
    next: json.books[nextIndex],
    previous: json.books[previousIndex],
  };
};
