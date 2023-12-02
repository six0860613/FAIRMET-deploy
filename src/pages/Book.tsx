import { Box, Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ScrollRestoration, useLocation } from "react-router-dom";
import BookBodySection from "../components/BookBodySection";
import { BookCardLayout } from "../components/BookCard";
import BookCarousel from "../components/BookCarousel";
import BookHeader from "../components/BookHeader";
import BookMainSection from "../components/BookMainSection";
import BrandCarousel from "../components/BrandCarousel";
import { BookTag } from "../types";

const Book = () => {
  const [active, setActive] = useState<BookTag>(BookTag.ALL);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/book") return;
    setActive(location.hash.slice(1) as BookTag);
  }, [location]);

  return (
    <Container px="0" maxW="100%" w="100%" mb="8rem">
      <ScrollRestoration />
      <Box as="section" id="book">
        <BookHeader />
        <BookMainSection active={active} />
      </Box>
      <Box h="5rem" />
      <BookCarousel type={BookCardLayout.LandscapeLeft} />
      <Box h="5rem" />
      <BookBodySection />
      <Box h="5rem" />
      <Box border="solid 1px" py="2rem">
        <Heading px="2rem">{"Brand コレクション"}</Heading>
        <Box h="2rem" />
        <BrandCarousel />
      </Box>
      <Box h="3rem" />
      {/* <BookFooterSection /> */}
    </Container>
  );
};

export default Book;
