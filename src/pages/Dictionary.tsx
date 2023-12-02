import { Box, Container, Heading } from "@chakra-ui/react";
import BookCarousel from "../components/BookCarousel";
import ReferenceSearch, { PaginationType } from "../components/ReferenceSearch";
import { BookCardLayout } from "../components/BookCard";
import DictionaryHeader from "../components/DictionaryHeader";

const Dictionary = () => {
  return (
    <Container px="0" maxW="100%" w="100%">
      <Box as="section" id="reference-search" mb="8rem">
        <DictionaryHeader />
        <Box h="2rem" />
        <ReferenceSearch type={PaginationType.normal} initLimit={3} />
      </Box>
      <Heading mb="2rem" fontSize={24}>
        {"Recommend/Related Post"}
      </Heading>
      <BookCarousel type={BookCardLayout.FixWidth} />
      <Box h="5rem" />
    </Container>
  );
};

export default Dictionary;
