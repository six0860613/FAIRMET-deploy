import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookTag, TBook } from "../types";
import { getBooks } from "../util/getBooks";
import BookFilter from "./BookFilter";
import BooksFlexCard from "./BooksFlexCard";

const limit = 3;

type Props = {
	active: BookTag;
};

const BookMainSection: React.FC<Props> = ({ active }) => {
	const [books, setBooks] = useState<TBook[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		getBooks({ limit, category: active }).then((res) => {
			setBooks(res);
		});
	}, [active]);

	return (
		<Box borderBottom="2px solid black">
			<BookFilter
				active={active}
				clickHandler={(filter) => {
					navigate(`/book#${filter}`);
				}}
			/>
			<Box h="3rem" />
			<Box
				bgImage={faker.image.url()}
				position="relative"
				h="16rem"
				mx={{ base: 0, md: "3rem" }}
			>
				<Center
					textColor="primary"
					w="100%"
					h="100%"
					py="1rem"
					px={{ base: "1rem", md: "4rem" }}
					gap="1rem"
					fontWeight={700}
					flexDirection="column"
					position="absolute"
					top="0"
					left="0"
					bgColor="shade.alpha.600"
				>
					<Text fontStyle="italic" opacity="100%">
						{active}
					</Text>
					<Text opacity="100%" textAlign="center">
						{faker.lorem.paragraph()}
					</Text>
					<Text opacity="100%" textAlign="center">
						{faker.lorem.paragraph()}
					</Text>
				</Center>
			</Box>
			<Box h="4rem" />
			<Flex
				mx="3rem"
				py="1rem"
				gap="1rem"
				h={{ base: "max-content", md: "30rem" }}
				flexDirection={{ base: "column", md: "row" }}
			>
				<Box h="100%" w={{ base: "100%", md: "50%" }}>
					{books.map(
						(book, i) =>
							i === 0 && (
								<Flex
									key={i}
									flexDirection="column"
									cursor="pointer"
									height="100%"
									w="85%"
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
										h="70%"
										w="100%"
									/>
									<Flex direction="column" flex="1" gap="1rem" h="30%">
										<Text fontSize={20}>{`\u3010${book.category}\u3011`}</Text>
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
							)
					)}
				</Box>
				<Flex
					flexDirection="column"
					h="100%"
					w={{ base: "100%", md: "50%" }}
					justifyContent="space-between"
					gap="1rem"
				>
					{books.map((book, i) =>
						i > 0 ? <BooksFlexCard key={i} book={book} /> : null
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default BookMainSection;
