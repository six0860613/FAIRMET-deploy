import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TBook } from "../types";
import { getBooks } from "../util/getBooks";
import { getFilters } from "../util/getFilters";
import BookList from "./BookList";
import Pagination from "./Pagination";
import ThinContainer from "./ThinContainer";

const initLimit = 4;

const BookBodySection = () => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [limit, setLimit] = useState<number>(initLimit);
  const [active, setActive] = useState<string | undefined>(undefined);
  const [filterArr, setFilterArr] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(1);
    setActive(undefined);
  }, [location]);

  useEffect(() => {
    getBooks({ limit, tag: active, skip: (currentPage - 1) * limit }).then(
      (res) => setBooks(res)
    );

    getBooks({ tag: active }).then((res) =>
      setTotalPage(Math.ceil(res.length / limit))
    );
  }, [limit, active, currentPage]);

  useEffect(() => {
    getFilters().then((res) =>
      setFilterArr(res.find((el) => el.type === "Item & Category")!.options)
    );
  }, []);

  return (
    <>
      <Box overflow="hidden">
        <HStack
          overflowX="scroll"
          borderY="solid 1px"
          py="0.5rem"
          mb="2rem"
          h="3.5rem"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <HStack w="max-content">
            {filterArr.length !== 0 &&
              filterArr.map((option, i) => (
                <Button
                  key={i}
                  textColor="secondary"
                  fontSize={active === option ? 24 : 16}
                  transition="all 0.2s"
                  variant="link"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(option);
                    setLimit(initLimit);
                  }}
                >
                  {option}
                </Button>
              ))}
          </HStack>
        </HStack>
      </Box>
      <ThinContainer>
        {books.length === 0 ? (
          <Center minH="5rem">
            <Text lineHeight="5rem">
              {"Nothing found, try another category"}
            </Text>
          </Center>
        ) : (
          <BookList books={books}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalPage}
            />
          </BookList>
        )}
        <Box h="2rem" />
      </ThinContainer>
    </>
  );
};

export default BookBodySection;
