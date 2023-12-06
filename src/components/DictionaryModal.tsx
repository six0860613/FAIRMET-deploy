import {
	Box,
	Button,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Brand, TagKey } from "../types";
import TagList from "./TagList";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	brand: Brand;
	previousHandler: (e: React.MouseEvent) => void;
	nextHandler: (e: React.MouseEvent) => void;
};

const imageGridMinH = 60;
const productTagList: TagKey[] = [
	"Style, Occasion",
	"Function & Activity",
	"Item & Category",
	"Notable Category & Item",
];
const otherTagList: TagKey[] = [
	"Sort",
	"Field",
	"Country & Region",
	"Price",
	"Gender",
];

const DictionaryModal: React.FC<Props> = ({
	isOpen,
	onClose,
	brand,
	nextHandler,
	previousHandler,
}) => {
	const scrollArea = useRef<HTMLDivElement>(null);
	const scroll = (scrollOffset: number) => {
		if (scrollArea.current) {
			scrollArea.current.scrollLeft += scrollOffset;
		}
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				my="auto"
				rounded="none"
				h={{ base: "85vh", md: "80vh" }}
				w={{ base: "85vw", md: "80vw" }}
				maxW="80rem"
				px="2rem"
				py="1rem"
				position="relative"
			>
				<Button
					variant="unstyled"
					textColor="secondary"
					position="absolute"
					fontSize="40"
					_hover={{ textColor: "shade.100" }}
					rounded="none"
					display="flex"
					justifyContent="center"
					alignItems="center"
					transform="auto"
					top="50%"
					translateY="-50%"
					left="0"
					translateX="-100%"
					p="0"
					onClick={previousHandler}
				>
					<FaChevronLeft />
				</Button>
				<Button
					variant="unstyled"
					textColor="secondary"
					_hover={{ textColor: "shade.100" }}
					position="absolute"
					fontSize="40"
					rounded="none"
					display="flex"
					justifyContent="center"
					alignItems="center"
					transform="auto"
					top="50%"
					translateY="-50%"
					right="0"
					translateX="100%"
					p="0"
					onClick={nextHandler}
				>
					<FaChevronRight />
				</Button>

				<Box overflow="hidden" h="100%" w="100%">
					<Flex
						flexDirection={{ base: "column", md: "row" }}
						overflowY="auto"
						h="100%"
						css={{
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						<Flex
							flex="2"
							direction="column"
							gap="1rem"
							minH={`${imageGridMinH}rem`}
							display={{ base: "none", md: "flex" }}
						>
							<Box flex={`2 1 ${imageGridMinH / 2}rem`} minH="0" minW="0">
								<Image
									src={faker.image.url()}
									objectFit="cover"
									w="100%"
									h="100%"
									objectPosition="center"
								/>
							</Box>
							<Box flex={`1 1 ${imageGridMinH / 4}rem`} minH="0" minW="0">
								<Image
									src={faker.image.url()}
									w="100%"
									h="100%"
									objectFit="cover"
									objectPosition="center"
								/>
							</Box>
							<Flex flex={`1 1 ${imageGridMinH / 4}rem`} minH="0" minW="0">
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
						<Flex display={{ base: "flex", md: "none" }} pos="relative">
							<Image
								src={faker.image.url()}
								w="100%"
								h="100%"
								objectFit="cover"
								objectPosition="center"
							/>
							<Image
								objectFit="cover"
								src={`/image/Brand/${brand.title}/logo.png`}
								alt={brand.title}
								w="40%"
								border="2px solid white"
								pos="absolute"
								zIndex={20}
								right="5%"
								bottom="-10%"
								opacity="0.9"
							/>
						</Flex>
						<Box flex={{ base: "1", md: "3" }}>
							<ModalHeader px={{ base: 1, md: 8 }}>{brand.title}</ModalHeader>
							<ModalBody px={{ base: 1, md: 8 }}>
								<Tabs position="relative">
									<Button
										display={{ base: "block", md: "none" }}
										rounded="none"
										variant="unstyle"
										p="0"
										position="absolute"
										left="-0.2rem"
										top="1.2rem"
										zIndex="15"
										onClick={() => scroll(-100)}
									>
										<FaChevronLeft />
									</Button>
									<Button
										display={{ base: "block", md: "none" }}
										rounded="none"
										variant="unstyle"
										p="0"
										position="absolute"
										right="-1.5rem"
										top="1.2rem"
										zIndex="15"
										onClick={() => scroll(+100)}
									>
										<FaChevronRight />
									</Button>
									<TabList
										ref={scrollArea}
										display="flex"
										w="100%"
										overflowX="auto"
										overflowY="hidden"
									>
										<Tab
											w={{ base: "max-content", md: "33%" }}
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
											whiteSpace="nowrap"
										>
											{"Introduction"}
										</Tab>
										<Tab
											w={{ base: "max-content", md: "33%" }}
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
											whiteSpace="nowrap"
										>
											{"Personality \u0026 Product"}
										</Tab>
										<Tab
											w={{ base: "max-content", md: "33%" }}
											_selected={{
												textColor: "secondary",
												borderBottom: "solid 1px",
											}}
											textColor="shade.500"
											whiteSpace="nowrap"
										>
											{"Other Detail \u0026 Link"}
										</Tab>
									</TabList>

									<TabPanels>
										<TabPanel
											display="flex"
											px="2rem"
											py="3rem"
											gap="1rem"
											flexDirection="column"
										>
											{brand?.content ? (
												brand.content.split("\n").map((section, i) => (
													<Text key={i} textColor="secondary">
														{section}
													</Text>
												))
											) : (
												<Text
													textAlign="center"
													fontSize={18}
													textColor="shade.500"
													opacity="20%"
													fontWeight={700}
													fontStyle="italic"
												>
													{"Empty"}
												</Text>
											)}
										</TabPanel>
										<TabPanel>
											<Flex flexDirection="column" gap="2rem">
												{productTagList.map((title, i) => (
													<TagList
														key={i}
														title={title}
														value={brand.tags[title]}
													/>
												))}
											</Flex>
										</TabPanel>
										<TabPanel>
											<Flex flexDirection="column" gap="2rem">
												{otherTagList.map((title, i) => (
													<TagList
														key={i}
														title={title}
														value={brand.tags[title]}
													/>
												))}
											</Flex>
										</TabPanel>
									</TabPanels>
								</Tabs>
							</ModalBody>
						</Box>
					</Flex>
				</Box>
				<Box
					display={{ base: "none", md: "block" }}
					position="absolute"
					right="-2rem"
					bottom="0.5rem"
					zIndex="10"
					w="5rem"
					h="5rem"
					border="2px solid black"
				>
					<Image
						objectFit="cover"
						src={`/image/Brand/${brand.title}/logo.png`}
						alt={brand.title}
					/>
				</Box>
			</ModalContent>
		</Modal>
	);
};

export default DictionaryModal;
