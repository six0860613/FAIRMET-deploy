import { GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TBook } from "../types";
import { getBooks } from "../util/getBooks";
import BookCard, { BookCardLayout } from "./BookCard";
import Carousel from "./Carousel";

const cardLength = 10;

type Props = {
  type: BookCardLayout;
};

const BookCarousel: React.FC<Props> = ({ type }) => {
  const [bookCardList, setBookCardList] = useState<TBook[]>([]);

  useEffect(() => {
    getBooks({ limit: cardLength }).then((res) => {
      setBookCardList(res);
    });
  }, []);

  return (
    <Carousel isReady>
      {bookCardList.map((bookCard, i) => (
        <GridItem key={i} position="relative" h="100%" minW="max-content">
          <BookCard book={bookCard} type={type} />
        </GridItem>
      ))}
    </Carousel>
  );
};

export default BookCarousel;
