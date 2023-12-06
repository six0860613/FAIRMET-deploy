import {
	Box,
	Button,
	Center,
	HStack,
	Text,
	Select,
	Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { TBook } from "../types";
import { getBooks } from "../util/getBooks";
import { getFilters } from "../util/getFilters";
import BookList from "./BookList";
import Pagination from "./Pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ThinContainer from "./ThinContainer";
const initLimit = 4;

const BookBodySection = () => {
	const [books, setBooks] = useState<TBook[]>([]);
	const [limit, setLimit] = useState<number>(initLimit);
	const [active, setActive] = useState<string | undefined>(undefined);
	const [filterArr, setFilterArr] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const scrollArea = useRef<HTMLDivElement>(null);

	const location = useLocation();

	const scroll = (scrollOffset: number) => {
		if (scrollArea.current) {
			scrollArea.current.scrollLeft += scrollOffset;
		}
	};

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
			<ThinContainer>
				<Flex bgColor="white" justifyContent="center" py="1rem">
					<Text fontSize={{ base: 14, md: 16 }}>{"Sort by\uFF1A"}</Text>
					<Select
						fontSize={{ base: 14, md: 16 }}
						w="fit-content"
						h="fit-content"
						fontStyle="italic"
						fontWeight="semibold"
						border="none"
						_focus={{ ring: "none" }}
					>
						<option value="DATE">{"DATE"}</option>
						<option value="FEATURE">{"FEATURE"}</option>
						<option value="POPULARITY">{"POPULARITY"}</option>
					</Select>
				</Flex>
				<Box
					overflow="hidden"
					borderTop="none"
					px="2rem"
					borderBottom="2px solid black"
					position="relative"
				>
					<Button
						rounded="none"
						variant="unstyle"
						bgColor="tint.500"
						py="0"
						px="0"
						position="absolute"
						left="0"
						top="50%"
						transform="translateY(-50%)"
						onClick={() => scroll(-200)}
					>
						<FaChevronLeft />
					</Button>
					<Button
						rounded="none"
						variant="unstyle"
						bgColor="tint.500"
						py="0"
						px="0"
						position="absolute"
						right="0"
						top="50%"
						transform="translateY(-50%)"
						onClick={() => scroll(+200)}
					>
						<FaChevronRight />
					</Button>
					<HStack
						ref={scrollArea}
						overflowX="scroll"
						borderY="solid 1px"
						py="0.5rem"
						h="3.5rem"
						css={{
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
						scrollBehavior="smooth"
						position="relative"
						border="none"
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
										px="1rem"
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
