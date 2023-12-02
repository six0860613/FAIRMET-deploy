import { Box, Center, Grid, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { BookTag, TBook } from "../types";
import { getBooks } from "../util/getBooks";
import BookFilter from "./BookFilter";
import BooksGridCard from "./BooksGridCard";
import { useNavigate } from "react-router-dom";

const row = 3;
const column = 6;
const gridLayout = [4, 2, 3, 3, 2, 2, 2];
const limit = gridLayout.length;

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
		<Box>
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
			<Text
				fontStyle="italic"
				fontWeight="500"
				fontSize="20"
				textColor="shade.500"
			>
				SPOTLIGHT
			</Text>
			<Grid
				mx="3rem"
				gap="1rem"
				gridTemplateColumns={`repeat(${column}, 1fr)`}
				gridTemplateRows={`repeat(${row}, 1fr)`}
			>
				{books.map((book, i) => (
					<BooksGridCard key={i} book={book} span={gridLayout[i]} />
				))}
			</Grid>
		</Box>
	);
};

export default BookMainSection;
