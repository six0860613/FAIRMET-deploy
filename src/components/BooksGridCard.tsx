import { Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { TBook } from "../types";
import { useNavigate } from "react-router-dom";

type Props = {
  book: TBook;
  span: number;
};

const BooksGridCard = ({ book, span }: Props) => {
  const navigate = useNavigate();

  return (
    <GridItem
      height="max-content"
      cursor="pointer"
      w="100%"
      gridColumn={`span ${span}`}
      onClick={() => {
        navigate(`/book/${book.id}`);
      }}
    >
      <Image
        src={book.image}
        alt={book.title}
        objectFit="cover"
        objectPosition="center"
        maxW="100%"
        h="24rem"
        w="100%"
      />
      <Flex direction="column" flex="1" overflow="hidden" gap="1rem">
        <Text fontSize={12}>{`\u3010${book.category}\u3011`}</Text>
        <Text
          w="100%"
          overflow="hidden"
          fontSize={16}
          css={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {book.title}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default BooksGridCard;
