import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import PaginationButton from "./PaginationButton";

type Props = {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ total, currentPage, setCurrentPage }: Props) => {
  return (
    <HStack>
      <Button
        disabled={currentPage === 1}
        h="2.5rem"
        w="2.5rem"
        variant="link"
        bgColor="shade.100"
        _hover={{ bgColor: "shade.300" }}
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
        onClick={(e) => {
          e.preventDefault();
          if (currentPage === 1) return;
          setCurrentPage((prev: number) => prev - 1);
        }}
      >
        <FaChevronLeft />
      </Button>
      {total <= 5 ? (
        Array.from({ length: total }, (_, index) => index + 1).map((page) => {
          return (
            <PaginationButton
              key={page}
              page={page}
              currentPage={currentPage}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            />
          );
        })
      ) : currentPage <= 3 ? (
        <>
          <PaginationButton
            page={1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          />
          <PaginationButton
            page={2}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(2);
            }}
          />
          <PaginationButton
            page={3}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(3);
            }}
          />
          <PaginationButton
            page={4}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(4);
            }}
          />
          <Text>...</Text>
          <PaginationButton
            page={total}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total);
            }}
          />
        </>
      ) : currentPage >= total - 2 ? (
        <>
          <PaginationButton
            page={1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          />
          <Text>...</Text>
          <PaginationButton
            page={total - 3}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total - 3);
            }}
          />
          <PaginationButton
            page={total - 2}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total - 2);
            }}
          />
          <PaginationButton
            page={total - 1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total - 1);
            }}
          />
          <PaginationButton
            page={total}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total);
            }}
          />
        </>
      ) : (
        <>
          <PaginationButton
            page={1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          />
          <Text>...</Text>
          <PaginationButton
            page={currentPage - 1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => prev - 1);
            }}
          />
          <PaginationButton
            page={currentPage}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
          <PaginationButton
            page={currentPage + 1}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => prev + 1);
            }}
          />
          <Text>...</Text>
          <PaginationButton
            page={total}
            currentPage={currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(total);
            }}
          />
        </>
      )}
      <Button
        h="2.5rem"
        w="2.5rem"
        variant="link"
        bgColor="shade.100"
        cursor={currentPage === total ? "not-allowed" : "pointer"}
        _hover={{ bgColor: "shade.300" }}
        onClick={(e) => {
          e.preventDefault();
          if (currentPage === total) return;
          setCurrentPage((prev) => prev + 1);
        }}
      >
        <FaChevronRight />
      </Button>
    </HStack>
  );
};

export default Pagination;
