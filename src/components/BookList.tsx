import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { TBook } from "../types";
import BookCard, { BookCardLayout } from "./BookCard";

type Props = {
  books: TBook[];
};

const BookList: React.FC<PropsWithChildren<Props>> = ({ books, children }) => {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      position="relative"
    >
      <Box>
        {books.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            type={
              i % 2 === 0
                ? BookCardLayout.LandscapeLeft
                : BookCardLayout.Portrait
            }
          />
        ))}
      </Box>
      {children}
    </Flex>
  );
};

export default BookList;
