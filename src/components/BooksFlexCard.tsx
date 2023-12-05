import { Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TBook } from "../types";

type Props = {
	book: TBook;
};

const BooksFlexCard = ({ book }: Props) => {
	const navigate = useNavigate();

	return (
		<Flex
			flexDirection="row"
			cursor="pointer"
			height="45%"
			w="100%"
			onClick={() => {
				navigate(`/book/${book.id}`);
			}}
			gap="1rem"
		>
			<Image
				src={book.image}
				alt={book.title}
				objectFit="cover"
				objectPosition="center"
				w="45%"
			/>
			<Flex direction="column" flex="1" gap="1rem">
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
		</Flex>
	);
};

export default BooksFlexCard;
