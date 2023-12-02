import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Container,
	Divider,
	Flex,
	HStack,
	Heading,
	Image,
	Skeleton,
	Spacer,
	Text,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookCardLayout } from "../components/BookCard";
import BookCarousel from "../components/BookCarousel";
import BrandCarousel from "../components/BrandCarousel";
import BrandHeader from "../components/BrandHeader";
import { TBook, TagKey } from "../types";
import { getBook } from "../util/getBook";

const bookTags: TagKey[] = [
	"Style, Occasion",
	"Gender",
	"Country & Region",
	"Field",
	"Function & Activity",
	"Notable Category & Item",
	"Item & Category",
];

const BookDetail = () => {
	const [book, setBook] = useState<TBook>();
	const [previousBook, setPreviousBook] = useState<TBook>();
	const [nextBook, setNextBook] = useState<TBook>();
	const { id } = useParams();

	useEffect(() => {
		if (!id) return;
		getBook({ id }).then((res) => {
			setPreviousBook(res.previous);
			setNextBook(res.next);
			setBook(res.book);
		});
	}, [id]);
	return (
		<Container px="0" maxW="100%" w="100%" mb="8rem">
			<Skeleton isLoaded={Boolean(book)} px="3rem">
				{Boolean(book) && (
					<>
						<Breadcrumb borderBottom="solid 1px" w="fit-content">
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<BreadcrumbLink href={`/book#${book?.category}`}>
									{`Book \u3010${book?.category}\u3011`}
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink href="#">{book?.title}</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
						<Box h="3rem" />

						<Box position="relative">
							<Box w="95%" overflow="hidden" mx="auto">
								<HStack h="18rem" w="max-content">
									{Array.from({ length: 5 }, (_, index) => index + 1).map(
										(index) => (
											<Box h="100%" key={index}>
												<Image
													src={faker.image.url()}
													objectFit="cover"
													w="100%"
													h="100%"
													objectPosition="center"
												/>
											</Box>
										)
									)}
								</HStack>
							</Box>
							<Box
								position="absolute"
								w="70%"
								p="1rem"
								h="fit-content"
								maxH="16rem"
								bgColor="white"
								left="50%"
								transform="auto"
								translateX="-50%"
								bottom="0"
								translateY="70%"
							>
								<Heading
									w="100%"
									overflow="hidden"
									css={{
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: 2,
									}}
								>
									{book?.title}
								</Heading>
								<Box h="2rem" />
								<Text>
									{"Seek your air, build your wardrobe & find your lifestyle"}
								</Text>
								<Box h="1rem" />
								<Text
									w="100%"
									overflow="hidden"
									css={{
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: 3,
									}}
								>
									{book?.content}
								</Text>
							</Box>
						</Box>

						<Box h="14rem" />
						<HStack justifyContent="end">
							<HStack
								borderBottom="solid 2px"
								borderColor="shade.500"
								w="fit-content"
								pl="2rem"
								pb="0.5rem"
								fontWeight={700}
								textColor="shade.500"
								gap="1rem"
							>
								<Text>{`\u3010${book?.category}\u3011`}</Text>
								<Divider
									orientation="vertical"
									h="1rem"
									borderColor="secondary"
								/>
								<Text>
									{new Intl.DateTimeFormat("zh-TW", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
									})
										.format(faker.date.anytime())
										.split("/")
										.join(".")}
								</Text>
								<Divider
									orientation="vertical"
									h="1rem"
									borderColor="secondary"
								/>
								<Text>{`By: ${faker.person.fullName()}`}</Text>
							</HStack>
						</HStack>

						<Box h="3rem" />
						<Flex h="fit-content" gap="2rem">
							<Flex flex="1" direction="column" gap="1rem" minH="30rem">
								<Box flex="2 1 15rem" minH="0" minW="0">
									<Image
										src={faker.image.url()}
										objectFit="cover"
										w="100%"
										h="100%"
										objectPosition="center"
									/>
								</Box>
								<Box flex="1 1 7.5rem" minH="0" minW="0">
									<Image
										src={faker.image.url()}
										w="100%"
										h="100%"
										objectFit="cover"
										objectPosition="center"
									/>
								</Box>
								<Flex flex="1 1 7.5rem" minH="0" minW="0">
									<Box flexBasis="50%">
										<Image
											w="100%"
											h="100%"
											src={faker.image.url()}
											objectFit="cover"
											objectPosition="center"
										/>
									</Box>
									<Box flexBasis="50%">
										<Image
											w="100%"
											h="100%"
											src={faker.image.url()}
											objectFit="cover"
											objectPosition="center"
										/>
									</Box>
								</Flex>
							</Flex>
							<Flex direction="column" minH="30rem" flex="2">
								<Text fontWeight={700} textColor="secondary" fontSize={20}>
									{book?.title}
								</Text>
								<Box h="1rem" />
								<Text fontSize={16}>{book?.content}</Text>
								<Box h="3rem" />
								<Spacer />

								<Flex direction="column">
									{bookTags.map((tagKey, i) => (
										<Text
											key={i}
											bgColor={i % 2 ? "shade.200" : "tint.500"}
											textColor="shade.500"
											fontWeight={700}
											fontStyle="italic"
											fontSize={14}
											px="0.5rem"
											h="2rem"
											lineHeight="2rem"
										>{`${tagKey}: ${book!.tags[tagKey as TagKey].join(
											", "
										)}`}</Text>
									))}
								</Flex>
							</Flex>
						</Flex>
						<Box h="3rem" />
						<Text fontWeight={700}>
							{"Tags / このページに関連するタグ \u3010The Relevant\u3011"}
						</Text>
						<Box h="1rem" />
						<Flex gap="0.5rem" flexWrap="wrap">
							{Object.keys(book!.tags)
								.reduce<string[]>(
									(acc, el) => [...acc, ...book!.tags[el as TagKey]],
									[] as string[]
								)
								.map((tag: string, i) => (
									<Box
										fontStyle="italic"
										fontWeight={700}
										textColor="shade.500"
										border="solid 1px"
										px="0.5rem"
										fontSize={14}
										key={i}
									>
										{tag}
									</Box>
								))}
						</Flex>
						<Box h="4rem" />
						<Divider borderColor="secondary" />
						<Box h="2rem" />
						<HStack>
							<Box
								maxW="30%"
								textColor="shade.500"
								fontWeight={700}
								_hover={{
									borderBottom: "solid 1px",
								}}
							>
								<Link to={`/book/${previousBook?.id}`}>
									<Text>{"Previous:"}</Text>
									{previousBook?.title}
								</Link>
							</Box>
							<Spacer />
							<Box
								maxW="30%"
								textColor="shade.500"
								fontWeight={700}
								_hover={{
									borderBottom: "solid 1px",
								}}
							>
								<Link to={`/book/${nextBook?.id}`}>
									<Text>{"Next:"}</Text>
									{nextBook?.title}
								</Link>
							</Box>
						</HStack>
						<Box h="2rem" />
						<Divider borderColor="secondary" />
					</>
				)}
			</Skeleton>
			<Box h="5rem" />
			<Box bgColor="primary" py="1rem">
				<Text px="1rem" fontWeight={700} fontSize={20}>
					{"Recommend / Relevant Post"}
				</Text>
				<BookCarousel type={BookCardLayout.Portrait} />
			</Box>
			<Box h="5rem" />
			<BrandHeader />
			<Box h="3rem" />
			<BrandCarousel />
			<Box h="3rem" />
			<Divider borderColor="secondary" />
		</Container>
	);
};

export default BookDetail;
