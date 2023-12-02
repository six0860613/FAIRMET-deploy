import { useEffect, useState } from "react";
import { TBook } from "../types";
import { getBooks } from "../util/getBooks";
import BookList from "./BookList";
import Pagination from "./Pagination";
import ThinContainer from "./ThinContainer";
import { Box } from "@chakra-ui/react";

type Props = {};

const limit = 6;

const BookFooterSection = (props: Props) => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    getBooks({ limit, skip: (currentPage - 1) * limit }).then((res) =>
      setBooks(res)
    );
  }, [currentPage]);

  useEffect(() => {
    getBooks({}).then((res) => setTotalPage(Math.ceil(res.length / limit)));
  }, []);

  return (
    <ThinContainer>
      <BookList books={books}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalPage}
        />
      </BookList>
      <Box h="2rem" />
    </ThinContainer>
  );
};

export default BookFooterSection;
